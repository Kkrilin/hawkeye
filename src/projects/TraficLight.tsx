import React, { useEffect, useState } from 'react'


export default function TraficLight() {
    const [now, setNow] = useState('stop')
    const [time, setTime] = useState(5)

    const changeNow = (prvState: string) => {
        if (prvState === 'stop') {
            setTime(3)
            return 'go'
        } if (prvState === 'go') {
            setTime(2)
            return 'ready'
        } else {
            setTime(5)
            return 'stop'
        }
    }

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null
        if (timer) {
            clearInterval(timer)
        }
        timer = setInterval(() => setNow(changeNow), time * 1000)
        return () => clearInterval(timer)
    }, [now])

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null
        if (timer) {
            clearInterval(timer)
        }
        timer = setInterval(() => setTime((prvState) => prvState - 1), 1000)
        return () => clearInterval(timer)
    }, [time])

    return (
        <div>
            <div className='flex flex-col justify-center items-center my-2'>
                <div className='flex flex-col gap-4 bg-black p-4 rounded-2xl'>
                    <div className={`circle  ${now === 'stop' ? 'stop' : ''}`}></div>
                    <div className={`circle  ${now === 'ready' ? 'ready' : ''}`}></div>
                    <div className={`circle  ${now === 'go' ? 'go' : ''}`}></div>
                </div>
            </div>
            <h3 className='text-center text-2xl'>{time} seconds</h3>
        </div>
    )
}