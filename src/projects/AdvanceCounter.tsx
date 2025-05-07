import React, { useState } from 'react'


export default function AdvanceCounter() {
    const [count, setCount] = useState(0)
    const [changeBy, setChangeBy] = useState(1)
    const [limit, setLimit] = useState({ low: -1000, up: 1000 })
    const [delay, setDelay] = useState(1)
    const [isAsyncIncrement, setIsAsyncIncrement] = useState(false)
    const [isAsyncDecrement, setisAsyncDecrement] = useState(false)

    const handleIncrement = () => {
        setCount(prv => prv + changeBy <= limit.up ? prv + changeBy : prv)
    }
    const handleDecrement = () => {
        setCount(prv => prv - changeBy >= limit.low ? prv - changeBy : prv)
    }

    const handleAsyncIncrement = async () => {
        setIsAsyncIncrement(true)
        await new Promise((res, rej) =>
            setTimeout(() => {
                setCount(prv => prv + changeBy <= limit.up ? prv + changeBy : prv)
                res("")
            }
                , delay * 1000)
        )
        setIsAsyncIncrement(false)
    }
    const handleAsyncDecrement = async () => {
        setisAsyncDecrement(true)
        await new Promise((res, rej) =>
            setTimeout(() => {
                setCount(prv => prv - changeBy >= limit.low ? prv - changeBy : prv)
                res("")
            }
                , delay * 1000)
        )
        setisAsyncDecrement(false)
    }
    return (
        <div className='flex justify-center items-center'>
            <div className=' flex flex-col items-center gap-2'>
                <h3 className='text-2xl'>{count}</h3>
                <div className=' flex gap-8'>
                    <button onClick={(handleDecrement)} className='px-2 border'>-</button>
                    <button onClick={handleIncrement} className='px-2 border'>+</button>
                </div>
                <div className=' flex gap-8'>
                    <button style={{ backgroundColor: isAsyncDecrement ? "grey" : 'white' }} disabled={isAsyncDecrement} onClick={handleAsyncDecrement} className='p-2 border'>async -</button>
                    <button style={{ backgroundColor: isAsyncIncrement ? "grey" : 'white' }} disabled={isAsyncIncrement} onClick={handleAsyncIncrement} className='p-2 border'>async +</button>
                </div>
                <label className='flex items-center gap-2' htmlFor="deliay">
                    Delay
                    <input onChange={(e) => setDelay(+e.target.value)} value={delay} min={1} max={3} step={1} type="range" />
                    {delay}s
                </label>
                <div className='flex gap-2'>
                    <h1>
                        Increment/Decrement by
                    </h1>
                    <input className='border w-20 px-2' value={changeBy} onChange={(e) => setChangeBy(+e.target.value)} type="number" min={1} />
                </div>
                <div className='flex gap-2'>
                    <h1>
                        Lower Limit
                    </h1>
                    <input className='border w-20 px-2' value={limit.low} onChange={(e) => setLimit({ ...limit, low: +e.target.value })} type="number" />
                </div>
                <div className='flex gap-2'>
                    <h1>
                        Upper Limit
                    </h1>
                    <input className='border w-20 px-2' value={limit.up} onChange={(e) => setLimit({ ...limit, up: +e.target.value })} type="number" />
                </div>
                <button onClick={() => {
                    setCount(0)
                    setDelay(1)
                    setLimit({ low: -1000, up: 1000 })
                    setChangeBy(1)
                }} className='py-2 px-8 border'>Reset</button>
            </div>
        </div>
    )
}