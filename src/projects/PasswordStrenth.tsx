import React, { useEffect, useState } from 'react'


export default function PasswordStrenth() {
    const [password, setPassword] = useState('')
    const [passwordHas, setPasswordHas] = useState<{ [key in string]: 1 | 0 }>({})
    // const [strenth, setStrenth] = useState('weak')
    let strenth = 'weak';
    const numberRegex = /\d/;
    const lowerCaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const symbolRegex = /[^a-z0-9A-Z]/
    useEffect(() => {
        setPasswordHas(() => {
            return {
                low: lowerCaseRegex.test(password) ? 1 : 0,
                up: uppercaseRegex.test(password) ? 1 : 0,
                num: numberRegex.test(password) ? 1 : 0,
                sym: symbolRegex.test(password) ? 1 : 0,
            }
        })
    }, [password])

    const passwrodScore = Math.min(6, Math.floor(password.length / 3)) + +lowerCaseRegex.test(password) + +uppercaseRegex.test(password) +
        +numberRegex.test(password) + +symbolRegex.test(password)
    console.log(passwrodScore, 'passwordScore')
    if (passwrodScore > 8) {
        strenth = 'strong'
    } else if (passwrodScore > 6) {
        strenth = 'medium'
    } else {
        strenth = 'weak'
    }
    return (
        <div>
            <div className='flex flex-col items-center'>
                <div className='flex flex-col gap-4 items-center'>
                    <input className='w-80 h-10 px-4 border-2 border-solid rounded-2xl' value={password} onChange={(e) => setPassword(e.target.value)} type="text" placeholder='enter the password' />
                    <div className='flex gap-4'>
                        <span className={passwordHas.low === 1 ? 'text-green-800' : 'text-gray-500'}>Lowercase </span>
                        <span className={passwordHas.up === 1 ? 'text-green-800' : 'text-gray-500'}>Uppercase </span>
                        <span className={passwordHas.num === 1 ? 'text-green-800' : 'text-gray-500'}>Number </span>
                        <span className={passwordHas.sym === 1 ? 'text-green-800' : 'text-gray-500'}>Symbols </span>
                    </div>
                    <div className='w-3xl h-4 overflow-hidden rounded-2xl border-2'>
                        <div style={{
                            width: `${10 * passwrodScore}%`,
                            transition: 'all 0.25s ease-in-out'
                        }}
                            className='h-full  bg-green-700'></div>
                    </div>
                    <p>Passowrd has {password.length} character</p>
                    <p>your password is <strong>{strenth}</strong> </p>
                </div>
            </div>
        </div>
    )
}