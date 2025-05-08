import { useEffect, useRef, useState } from 'react'
import { getSuffeleSymbol } from '../helper/symbol'


const size = 4;
const tileToMatch = 2;

const getTiles = () => getSuffeleSymbol((size * size) / tileToMatch, true).map(symbol => ({ symbol, isOpen: false }))
interface Tile {
    symbol: string
    isOpen: boolean
}

export default function MatchPair() {
    const [tiles, setTiles] = useState(getTiles)
    const [openTiles, setOpenTiles] = useState<number[]>([])
    const timerId = useRef<NodeJS.Timeout>(null)
    const attemts = useRef<number>(0)
    const matches = useRef(0)
    const isReseting = useRef(false)
    const closePreviousTiles = () => {
        setTiles(prve => {
            const newState = [...prve]
            newState[openTiles[0]] = { ...prve[openTiles[0]], isOpen: false }
            newState[openTiles[1]] = { ...prve[openTiles[1]], isOpen: false }
            setOpenTiles(openTiles.slice(tileToMatch));
            return newState
        })
    }

    const resetTiles = () => {
        timerId.current = null;
        attemts.current = 0;
        matches.current = 0;
        isReseting.current = true;
        setTiles(prv => prv.map(s => ({ ...s, isOpen: false })))
        setTimeout(() => {
            setTiles(getTiles())
            isReseting.current = false
        }, 500)
    }

    const onTileClick = (id: number) => {
        if (tiles[id].isOpen || isReseting.current) return
        attemts.current++
        setOpenTiles([...openTiles, id]);
        setTiles(prv => {
            const newState = [...prv];
            newState[id] = { ...newState[id], isOpen: true }
            return newState
        })
    }

    useEffect(() => {
        if (openTiles.length === tileToMatch) {
            if (tiles[openTiles[0]].symbol === tiles[openTiles[1]].symbol) {
                setOpenTiles([])
                matches.current++
            } else {
                timerId.current = setTimeout(() => closePreviousTiles(), 3000)
            }
        }

        if (openTiles.length === tileToMatch + 1) {
            if (timerId.current) {
                clearTimeout(timerId.current)
            }
            closePreviousTiles()
        }
    }, [tiles])
    return (
        <div className='gap-5 flex flex-col justify-center items-center'>
            <div className='w-150'>
                <div className='grid grid-cols-4 grid-rows-4 gap-8'>
                    <Tiles tiles={tiles} onTileClick={onTileClick} />
                </div>
            </div>
            <div>
                <button onClick={resetTiles} className='py-2 px-6 text-2xl border capitalize rounded-md'>reset</button>
                <h3 className='text-center my-4 text-2xl'>Attempts: {attemts.current}</h3>
                {matches.current === 8 && <p>Congratulations</p>}
            </div>
        </div>
    )
}


interface TilesProps {
    tiles: Array<Tile>
    onTileClick: (id: number) => void
}

function Tiles({ tiles, onTileClick }: TilesProps) {
    return (<>
        {tiles.map((tile, index) => (
            <div className={`card ${tile.isOpen ? "rotate" : ''}  bg-orange-300 shadow`} key={index} onClick={() => onTileClick(index)}>
                <div className='back text-6xl flex justify-center items-center'>{tile.symbol}</div>
                <div className='front absolute '></div>
            </div>
        ))}
    </>
    )
}