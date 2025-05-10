import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";

type ReturnTypeOfTypeAhead = [
  string,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  string[],
  boolean,
  (text: string) => void,
  number | null,
  (i: number | null) => void,
  (e: React.KeyboardEvent<HTMLInputElement>) => void,
  string,
  number
];

type ReturnTypeOfApiRequest = {
  items: string[];
  apiError: string;
  reTryTimer: number;
};

const suggestionLength = 5;
async function makeApiRequest(text: string): Promise<ReturnTypeOfApiRequest> {
  const result: ReturnTypeOfApiRequest = {
    items: [],
    apiError: " ",
    reTryTimer: 0,
  };
  try {
    const res = await axios.get(
      `https://api.github.com/search/users?per_page=${suggestionLength}&q=${text}`
    );
    result.items = res.data.items.map((item) => item.login);
    return result;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 403) {
        console.log("error.response error", error.response);
        const resetTime = error.response.headers["x-ratelimit-reset"];
        console.log(resetTime, Date.now());
        if (resetTime !== null) {
          const timeForReset = Math.ceil(
            parseFloat(resetTime) - Date.now() / 1000
          );
          result.reTryTimer = timeForReset;
        }
      }
      result.apiError = error.message;
    }
    result.apiError =
      (error as AxiosError).message || "An unknown error occurred";
    console.log("result", result);
    return result;
  }
}

const debounce = <T extends (...args: unknown[]) => void>(
  fn: T,
  delay = 500
): ((...args: Parameters<T>) => void) => {
  let timer: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>): void => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(fn, delay, ...args);
  };
};

export const useAutoCompleteOnline = (): ReturnTypeOfTypeAhead => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionFocus, setSuggestionFocus] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [retryTimer, setRetryTimer] = useState(0);
  const debouncedApiRequest = useCallback(
    debounce(async (text) => {
      setLoading(true);
      try {
        const res = await makeApiRequest(text as string);
        if (res.reTryTimer > 0) {
          setRetryTimer(res.reTryTimer);
        }
        if (res.items.length === 0) {
          setApiError("no result found");
        } else {
          setApiError("");
        }
        setSuggestions(res.items);
      } catch (error) {
        setApiError(error.message);
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }, 300),
    [makeApiRequest]
  );

  useEffect(() => {
    if (suggestionFocus !== null) {
      setInputValue(suggestions[suggestionFocus]);
    }
  }, [suggestionFocus, suggestions]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (retryTimer > 0) {
        setRetryTimer((prevVal) => prevVal - 1);
      } else {
        setApiError("");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [retryTimer]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputValue(text);
    if (text.trim().length > 0) {
      debouncedApiRequest(text);
    } else {
      setSuggestions([]);
    }
  };

  const handleClick = (text: string) => {
    setInputValue(text);
    setSuggestions([]);
    setSuggestionFocus(null);
  };

  const handleSuggestionFocus = (i: number | null) => {
    setSuggestionFocus(i);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && suggestionFocus !== null) {
      setSuggestions([]);
      setSuggestionFocus(null);
    }

    if (e.key === "ArrowDown") {
      setSuggestionFocus((prve) => {
        if (prve !== null && prve < suggestions.length - 1) {
          return prve + 1;
        } else {
          return 0;
        }
      });
    }

    if (e.key === "ArrowUp") {
      setSuggestionFocus((prve) => {
        if (prve !== null && prve > 0) {
          return prve - 1;
        } else {
          return suggestions.length - 1;
        }
      });
    }
  };

  return [
    inputValue,
    handleInputChange,
    suggestions,
    loading,
    handleClick,
    suggestionFocus,
    handleSuggestionFocus,
    handleKeyDown,
    apiError,
    retryTimer,
  ];
};
