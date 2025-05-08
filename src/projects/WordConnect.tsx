import { useEffect, useMemo, useRef, useState } from 'react'
import { getConnectedGroup, isWordFromSameGroup } from '../helper/match..helper'


export default function WordConnect() {
    const [groupSize, setGroupSize] = useState(2)
    const [itemCount, setItemCount] = useState(4)
    const [gridCol, setGridCol] = useState(2)
    const [words, setWords] = useState<string[]>([])
    const [wordGroup, setWordGroup] = useState([])
    const [allItems, groupItems] = useMemo(() => getConnectedGroup(groupSize, itemCount), [groupSize, itemCount]);
    const [selected, setSelected] = useState<string[]>([])
    const [worngSelection, setWrongSelection] = useState<string[]>([])
    const matchWord = useRef<string[]>([])
    console.log('selected', selected)
    useEffect(() => {
        setWords(() => [...allItems])
        setWordGroup(groupItems)
    }, [groupSize, itemCount, gridCol])
    useEffect(() => {
        if (selected.length === groupSize) {
            const isSameGroup = isWordFromSameGroup(wordGroup, selected)
            if (isSameGroup) {
                matchWord.current.push(...selected)
            } else {
                setWrongSelection([...selected])
                setTimeout(() => setWrongSelection([]), 2000)
            }
            setSelected([])
        }

    }, [selected])

    const resetGame = () => {
        const [allItems, groupItems] = getConnectedGroup(groupSize, itemCount);
        console.log(allItems)
        setSelected([])
        matchWord.current = []
        setWrongSelection([])
        setWordGroup(groupItems)
        setWords(allItems)
    }

    return (
        <div >
            <div style={{ marginRight: "5rem" }}>
                <h1 className='text-center text-2xl my-4'>
                    Connect group of 2 words by clicking on related words
                </h1>
                <div className='flex gap-16 my-4'>
                    <label htmlFor="groupSize">
                        groupSize
                        <input className='mx-4 px-2 border rounded-md h-10 w-20' value={groupSize} onChange={(e) => setGroupSize(+e.target.value)} id='groupSize' min={2} max={4} type="number" />
                    </label>
                    <label htmlFor="itemCount">
                        itemCount
                        <input className='mx-4 px-2 border rounded-md h-10 w-20' value={itemCount} onChange={(e) => setItemCount(+e.target.value)} id='itemCount' min={2} max={12} type="number" />
                    </label>
                    <label htmlFor="gridCol">
                        gridCol
                        <input className='mx-4 px-2 border rounded-md h-10 w-20' value={gridCol} onChange={(e) => setGridCol(+e.target.value)} id='gridCol' min={2} max={4} type="number" />
                    </label>
                </div>
                <div
                    style={{
                        overflowY: "auto",
                        minHeight: "20vh",
                        gridTemplateColumns: `repeat(${gridCol}, minmax(0, 1fr))`
                    }}
                    className='grid gap-2'>
                    {words?.map((word => <WordCard worngSelection={worngSelection} key={word} matchWord={matchWord} selected={selected} setSelected={setSelected} word={word} />))}
                </div>
                <div className='flex justify-center my-10 '>
                    <button onClick={() => resetGame()} className=' capitalize text-2xl font-bold text-white bg-black px-10 py-3 rounded-sm' >reset</button>
                </div>
            </div>
        </div>
    )
}

interface WordCardProps {
    word: string
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
    selected: string[]
    worngSelection: string[]
    matchWord: React.RefObject<string[]>
}

function WordCard({ word, setSelected, selected, matchWord, worngSelection }: WordCardProps) {
    return (
        <div
            onClick={() => {
                if (worngSelection.length) return
                if (matchWord.current.includes(word) || selected.includes(word)) return;
                setSelected(prve => [...prve, word])
            }
            }
            className='rounded-md text-center bg-white py-3 shadow-2xl border transition-all'
            style={{
                backgroundColor: selected.includes(word) ? "orange" : matchWord.current.includes(word) ? 'lightgreen' : worngSelection.includes(word) ? 'grey' : 'white'
            }}
        >
            {word}
        </div>
    )
}