import { CircularProgress } from "@mui/material"
import { useAutoCompleteOnline } from "../hookes/useTypeAheadOnLine"

export default function TypeAheadOnline() {
    const [text, handleInputChange, suggestions, loading, handleClick, suggestionFocus, handleSuggestionFocus, handKeyDown, apiError, retryTimer] = useAutoCompleteOnline()

    return (
        <div>
            <div className="flex flex-col gap-3 items-center">
                <h1 className="text-2xl font-bold">Use up & down arrows to navigate suggestions</h1>
                <div className="relative flex items-center">
                    <input
                        value={text}
                        onChange={(e) => handleInputChange(e)}
                        onKeyDown={(e) => handKeyDown(e)}
                        className="text-2xl bg-white text-black px-2 rounded-md border w-200 h-14"
                        type="search"
                        placeholder="search for github profile"
                    />
                </div>
                <div className="w-198">
                    {loading && <div className="flex justify-center">< CircularProgress /></div>}
                    {apiError && <h1 className="text-red-500 text-center text-2xl">{apiError}</h1>}
                    {retryTimer > 0 && <div className="text-center text-2xl">Retry After: {`${retryTimer}`.padStart(2, '0')}</div>}
                    {!loading &&
                        <ul>
                            {suggestions.map((sug, i) => (
                                <li
                                    key={sug}
                                    onClick={() => handleClick(sug)}
                                    onMouseLeave={() => handleSuggestionFocus(null)}
                                    onMouseOver={() => handleSuggestionFocus(i)}
                                    className="text-white  my-1 cursor-pointer"
                                    style={{
                                        backgroundColor: suggestionFocus === i ? "black" : "darkblue"
                                    }}
                                >
                                    {sug}
                                </li>))}
                        </ul>
                    }
                </div>
            </div>
        </div>
    )
}