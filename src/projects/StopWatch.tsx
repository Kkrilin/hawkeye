import { useRef, useState } from 'react'


function StopWatch() {
    const [time, setTime] = useState(0)
    const [action, setAction] = useState('')
    const timer = useRef<ReturnType<typeof setInterval> | null>(null);

    const millsecond = (time % 1000);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 60000) % 60);
    const hours = Math.floor((time / (60000 * 60)) % 60);

    const handleAction = (action: string) => {
        switch (action) {
            case "start":
                if (timer.current) clearInterval(timer.current);
                setAction('start')
                timer.current = setInterval(() => {
                    setTime(prvState => prvState + 10)
                }, 10)
                return;
            case "pause":
                setAction('pause')
                if (timer.current) {
                    clearInterval(timer.current)
                }
                return;
            case "reset":
                setAction('reset')
                setTime(0)
                if (timer.current) {
                    clearInterval(timer.current)
                }
                return
        }
    }
    return (
        <div>
            <div style={{ borderRadius: "50%" }} className='flex flex-col gap-10 justify-center items-center mx-40 border-solid border-2 border-amber-950 w-80 h-80'>
                <h3 className='text-3xl'>StopWatch</h3>
                <div className='bg-emerald-400 p-4 rounded-2xl w-46 flex justify-center'>
                    <span className='time'>{`${hours}`.padStart(2, '0')}</span>
                    <span className='time'>:{`${minutes}`.padStart(2, '0')}</span>
                    <span className='time'>:{`${seconds}`.padStart(2, '0')}</span>
                    <span className='time'>:{`${millsecond}`.padStart(3, '0')}</span>
                </div>
                <div className="flex gap-1">
                    <span
                        onClick={() => action !== 'start' && handleAction('start')}
                        className={`rounded-2xl ${action === 'start' ? "bg-gray-500 cursor-not-allowed" : "bg-fuchsia-950 cursor-pointer"} py-2 px-4 text-white transition-transform active:scale-90 hover:bg-fuchsia-800`}
                    >
                        Start
                    </span>

                    <span onClick={() => handleAction('pause')} className={`rounded-2xl ${action === 'pause' ? "bg-fuchsia-800" : 'bg-fuchsia-950'} py-2 px-4 text-white cursor-pointer transition-transform active:scale-90 hover:bg-fuchsia-800`}>
                        Pause
                    </span>
                    <span onClick={() => handleAction('reset')} className={`rounded-2xl ${action === 'reset' ? "bg-fuchsia-800" : 'bg-fuchsia-950'} py-2 px-4 text-white cursor-pointer transition-transform active:scale-90 hover:bg-fuchsia-800`}>
                        Reset
                    </span>
                </div>

            </div>
        </div>
    )
}

export default StopWatch