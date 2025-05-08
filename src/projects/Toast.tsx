import { useEffect, useState } from "react"

type Message = {
    id: number
    message: string
    toastType: string
}

export default function Toaster() {
    const [toastType, setToastType] = useState('success')
    const [horizontalPosition, setHorizontalPosition] = useState('left')
    const [verticlePosition, setVerticlePosition] = useState('top')
    const [message, setMessage] = useState('my toast textsdsd')
    const [toastMessages, setToastMessages] = useState<Message[]>([])
    const [duration, setDuration] = useState(4)
    const timerIds: NodeJS.Timeout[] = []

    useEffect(() => {
        return () => {
            timerIds.forEach((timerId) => clearTimeout(timerId));
        };
    }, []);

    const handleToastClick = () => {
        const newToast = {
            id: Date.now(),
            message,
            toastType
        }
        setToastMessages([...toastMessages, newToast])
        console.log(duration)
        const timerId = setTimeout(() => {
            setToastMessages(prve => prve.filter(mes => mes.id !== newToast.id))
        }, duration * 1000)
        timerIds.push(timerId)
    }

    const removeToast = (id: number) => {
        setToastMessages(prve => prve.filter(mes => mes.id !== id))
    }

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDuration(+e.target.value)
    }
    console.log(horizontalPosition, verticlePosition)
    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <div className={`toast_container ${horizontalPosition} ${verticlePosition}`}>
                {toastMessages.map(message => (
                    <Toast key={message.id} horizontalPosition={horizontalPosition} verticlePosition={verticlePosition} removeToast={removeToast} message={message} />
                ))}
            </div>
            <div>
                <select onChange={(e) => setHorizontalPosition(e.target.value)} className="w-80 h-10 border-solid border-2" name="" id="" value={horizontalPosition}>
                    <DropDown options={["left", "right"]} />
                </select>
            </div>
            <div>
                <select onChange={(e) => setVerticlePosition(e.target.value)} className="w-80 h-10 border-solid border-2" name="" id="" value={verticlePosition}>
                    <DropDown options={["top", "bottom"]} />
                </select>
            </div>
            <div>
                <select onChange={(e) => setToastType(e.target.value)} className="w-80 h-10 border-solid border-2" name="" id="" value={toastType}>
                    <DropDown options={["normal", "success", "error", "warning", "info"]} />
                </select>
            </div>
            <div>
                <input className="border-solid border-2 border-b-blue-900 px-2 h-8" onChange={(e) => setMessage(e.target.value)} value={message} id="toast_text" type="message" />
            </div>
            <div>
                <input value={duration} onChange={(e) => handleDurationChange(e)} id="toast_text" type="range" min={4} max={10} step={1} />
            </div>
            <div>
                <button className="p-2 border-amber-500 border-2 bg-white" onClick={handleToastClick}>Show Toast</button>
            </div>
        </div>
    )
}


interface TypeProps {
    message: Message,
    horizontalPosition: string,
    verticlePosition: string,
    removeToast: (id: number) => void
}

const Toast = ({ message, horizontalPosition, verticlePosition, removeToast }: TypeProps) => {

    return (
        <div className={`toast fade${horizontalPosition} ${message.toastType}`}>
            <span >{message.message}</span>
            <button className="text-red-400 mx-2" onClick={() => removeToast(message.id)}>X</button>
        </div>
    )
}

interface DropDownProps {
    options: string[],
}

const DropDown = ({ options }: DropDownProps) => {
    return (
        <>
            {options.map(option => <option key={option} value={option}>{option}</option>)}
        </>
    )
}