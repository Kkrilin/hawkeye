import { useEffect, useRef, useState } from "react";
import Trie from "../helper/typeAhead";

type ReturnTypeOfAutoComplete = [
  string,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  string[],
  number | null,
  (index: number | null) => void,
  (text: string) => void,
  (e: React.KeyboardEvent<HTMLInputElement>) => void
];

export const useAutoComplete = (
  suggestionList: string[]
): ReturnTypeOfAutoComplete => {
  const [text, setText] = useState("");
  const suggestionLength = 5;
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionFocus, setSuggestionFocus] = useState<number | null>(null);
  const trie = useRef<Trie>(new Trie(suggestionList));

  useEffect(() => {
    if (suggestionFocus !== null) {
      setText(suggestions[suggestionFocus]);
    }
  }, [suggestionFocus, suggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e.taregt", e.target.value);
    setText(e.target.value);
    setSuggestions(
      e.target.value
        ? trie.current.getWordsFromTrie(e.target.value, suggestionLength)
        : []
    );
    setSuggestionFocus(null);
  };
  const handKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key, suggestionFocus);
    if (e.key === "Enter" && suggestionFocus !== null) {
      setSuggestionFocus(null);
      setSuggestions([]);
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

  const handleClick = (text: string) => {
    setText(text);
    setSuggestionFocus(null);
    setSuggestions([]);
  };

  const handleSuggestion = (index: number | null) => {
    setSuggestionFocus(index);
  };

  return [
    text,
    handleInputChange,
    suggestions,
    suggestionFocus,
    handleSuggestion,
    handleClick,
    handKeyDown,
  ];
};
