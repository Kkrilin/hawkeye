import { useAutoComplete } from "../hookes/useTypeAheadOffline";
import { suggestionsList } from "../utils/typeAhead";
export default function TypeAhead() {
    const [value, setInputChange, suggestions, suggestionFocus, handleSuggestion, handleClick, handKeyDown] = useAutoComplete(suggestionsList);
    return (
        <div>
            <div className="flex flex-col gap-3 items-center">
                <h1 className="text-2xl font-bold">Use up & down arrows to navigate suggestions</h1>
                <div className="relative flex items-center">
                    <input
                        value={value}
                        onChange={(e) => setInputChange(e)}
                        onKeyDown={(e) => handKeyDown(e)}
                        className="text-2xl bg-white text-black px-2 rounded-md border w-200 h-14"
                        type="search"
                        placeholder="search for country"
                    />
                </div>
                <div className="w-198">
                    <ul>
                        {suggestions.map((sug, i) => (
                            <li
                                onClick={() => handleClick(sug)}
                                onMouseLeave={() => handleSuggestion(null)}
                                onMouseOver={() => handleSuggestion(i)}
                                className="text-white  my-1 cursor-pointer"
                                style={{
                                    backgroundColor: suggestionFocus === i ? "black" : "darkblue"
                                }}
                            >
                                {sug}
                            </li>))}
                    </ul>
                </div>
            </div>
        </div>
    )
}