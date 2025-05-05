import { useEffect, useRef, useState } from "react"

export default function Toaster() {
    const [toastType, setToastType] = useState('success')
    const [side, setSide] = useState('left')
    const [position, setPosition] = useState('top')
    const [text, setText] = useState('my toast textsdsd')
    const [duration, setDuration] = useState(1)
    const [showToast, setShowToast] = useState(false)
    const timerRef = useRef<NodeJS.Timeout>(null)

    const handleToastClick = () => {
        setShowToast(true)
    }

    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }
        if (showToast) {
            timerRef.current = setTimeout(() => setShowToast(false), duration * 1000)
        }
        return () => clearTimeout(timerRef.current as NodeJS.Timeout)
    }, [showToast, duration])

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDuration(+e.target.value)
    }

    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <Toast side={side} position={position} showToast={showToast} text={text} toastType={toastType} />
            <div>
                <select onChange={(e) => setSide(e.target.value)} className="w-80 h-10 border-solid border-2" name="" id="" value={side}>
                    <DropDown options={["left", "right"]} />
                </select>
            </div>
            <div>
                <select onChange={(e) => setPosition(e.target.value)} className="w-80 h-10 border-solid border-2" name="" id="" value={position}>
                    <DropDown options={["top", "bottom"]} />
                </select>
            </div>
            <div>
                <select onChange={(e) => setToastType(e.target.value)} className="w-80 h-10 border-solid border-2" name="" id="" value={toastType}>
                    <DropDown options={["normal", "success", "error", "warning", "info"]} />
                </select>
            </div>
            <div>
                <input className="border-solid border-2 border-b-blue-900 px-2 h-8" onChange={(e) => setText(e.target.value)} value={text} id="toast_text" type="text" />
            </div>
            <div>
                <input value={duration} onChange={(e) => handleDurationChange(e)} id="toast_text" type="range" min={1} max={10} step={1} />
            </div>
            <div>
                <button className="p-2 border-amber-500 border-2 bg-white" onClick={handleToastClick}>Show Toast</button>
            </div>
        </div>
    )
}


interface TypeProps {
    toastType: string,
    text: string,
    showToast: boolean,
    side: string,
    position: string,
}

const Toast = ({ toastType, text, showToast, side, position }: TypeProps) => {
    let transform = 'translateX(-100%)';
    let sideCss = {}
    let positionCss = {}
    if (side === 'left') {
        transform = 'translateX(-100%)';
    } else {
        transform = 'translateX(100%)';
    }
    if (side === 'left') {
        sideCss = showToast ? { left: '20rem' } : { left: '0' }
    } else {
        sideCss = showToast ? { right: '20rem' } : { right: '0' }
    }
    positionCss = position === "top" ? { top: '100px' } : { bottom: '100px' }

    return (
        <div style={{
            transform: transform,
            ...sideCss,
            ...positionCss
        }}
            className={`${toastType} toast ${showToast ? '' : 'hide'}`}
        >
            <span className="icon"></span>
            <span >{text}</span>
        </div>
    )
}

interface DropDownProps {
    options: string[],
}

const DropDown = ({ options }: DropDownProps) => {
    return (
        <>
            {options.map(option => <option value={option}>{option}</option>)}
        </>
    )
}