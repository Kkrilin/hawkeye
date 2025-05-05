import React, { useRef, useState } from 'react'


export default function GridLights() {
    const [grid, setGrid] = useState(3)
    const [duration, setDuration] = useState(100)
    const gridCollectionRef = useRef<Set<HTMLDivElement>>(new Set())
    const [isAnimating, setAnimating] = useState(false)
    const handleGridItemClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (isAnimating) return
        gridCollectionRef.current.add(e.currentTarget)
        e.currentTarget.style.backgroundColor = 'green'
        if (gridCollectionRef.current.size === grid ** 2) {
            setAnimating(true)
            const items = Array.from(gridCollectionRef.current).reverse();
            items.forEach((el, i) => {
                setTimeout(() => {
                    if (i === items.length - 1) {
                        gridCollectionRef.current.clear();
                        setAnimating(false);
                    }
                    el.style.backgroundColor = '#FEF3C6'
                }, duration * (i + 1))
            })
        }
    }

    return (
        <div className='flex justify-center'>
            <div>
                <p>Click on cells to select them. Once all cells are selected, they will be unselected one by one in the reverse order they were selected.</p>
                <label htmlFor="grid">
                    grid size
                    <input id='grid' className='w-8 h-6 border-2 p-2 m-4' value={grid} onChange={(e) => setGrid(+e.target.value)} type="text" />
                </label>
                <label htmlFor="grid">
                    duration
                    <input min={2} id='grid' className='w-16 h-6 border-2 p-2 m-4' value={duration} onChange={(e) => setDuration(+e.target.value)} type="text" />
                </label>
                <div className={`grid  gap-4 my-10, place-content-center`}
                    style={{
                        gridTemplateColumns: `repeat(${grid}, minmax(0, 1fr))`,
                        gridTemplateRows: `repeat(${grid}, minmax(0, 1fr))`
                    }}
                >
                    {Array.from({ length: grid ** 2 }, (_, i) => (
                        <div
                            onClick={(e) => handleGridItemClick(e)}
                            style={{
                                border: "1px solid black",
                                width: `${20 * Math.floor(30 / grid)}px`,
                                height: `${20 * Math.floor(30 / grid)}px`,
                            }}
                            key={i}>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}