import React, { useEffect, useState } from 'react'

type Props = {
    children: React.ReactNode
}

export default function Modal({ children }: Props) {
    const [open, setOpen] = useState(false)
    const [opacity, setOpacity] = useState(0)
    const [position, setPositon] = useState({ left: 0, top: 0 })
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setOpen(false)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])
    return (
        <div>
            <button onClick={() => setOpen(true)} className='border-2 hover:bg-amber-400 cursor-pointer max-w-max p-1 rounded'>{children}</button>
            <div>
                <label className='flex items-center gap-2' htmlFor="opacity">
                    BackDrop Opacity
                    <input value={opacity} onChange={(e) => setOpacity(Number(e.currentTarget.value))} type="range" name="" id="opacity" step={0.1} min={0} max={1} />
                    {opacity}
                </label>
                <label className='flex items-center gap-2' htmlFor="pos_left">
                    Model from Left(%)
                    <input value={position.left} onChange={(e) => setPositon({ ...position, left: +e.currentTarget.value })} type="number" name="" id="pos_left" min={0} max={100} />
                </label>
                <label className='flex items-center gap-2' htmlFor="pos_top">
                    model from Top(%)
                    <input value={position.top} onChange={(e) => setPositon({ ...position, top: +e.currentTarget.value })} type="number" name="" id="pos_top" min={0} max={100} />
                </label>
            </div>
            <PopOver open={open} setOpen={setOpen} opacity={opacity} position={position} />
        </div>
    )
}

interface PopOverProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    opacity: number
    position: {
        left: number;
        top: number;
    }
}

function PopOver({ open, setOpen, opacity, position }: PopOverProps) {
    console.log(open, 'PopOver')
    if (!open) {
        return null
    }

    return (
        <>
            <div style={{ opacity: `${opacity}` }} onClick={() => setOpen(false)} className='back_drop'>
            </div>
            <div style={{
                left: `${position.left || 50}%`,
                top: `${position.top || 50}%`,
            }} className=' bg-white fixed border-solid border-2 border-amber-950  -translate-x-1/2 -translate-y-1/2 p-4'>
                <div>
                    <h1>model open</h1>
                    <p>Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit. Provident rem delectus impedit ipsum minus?
                        Dolorem dignissimos architecto eius accusamus quis minus eveniet est, consequuntur, amet, modi
                        ipsum nostrum sunt perferendis?
                    </p>
                </div>
                <div className='flex justify-end'>
                    <button className='border-solid border-2 border-blue-800 py-1 px-4 rounded-2xl cursor-pointer hover:bg-amber-50' onClick={() => setOpen(false)}>close</button>
                </div>
            </div>
        </>
    )
}