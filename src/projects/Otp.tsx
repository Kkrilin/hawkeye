import React, { useRef, useState } from 'react'


export default function Otp() {
    const [otpfields, setOtpFields] = useState(Array(6).fill(''))
    const otpInputRef = useRef([])
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value.replace(/\D/, '')
        const singleDigit = value.slice(0, 1)
        const copyOtpFileds = [...otpfields]
        copyOtpFileds[index] = singleDigit
        if (index < otpfields.length - 1 && singleDigit) {
            otpInputRef.current[index + 1].focus()
        }
        setOtpFields(copyOtpFileds)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            const copyOtpFields = [...otpfields]
            copyOtpFields[index] = ''
            setOtpFields(copyOtpFields)
            if (index > 0) {
                otpInputRef.current[index - 1].focus()
            }
        }
        if (e.key === 'ArrowRight' && index < otpfields.length - 1) {
            otpInputRef.current[index + 1].focus()
        }
        if (e.key === 'ArrowLeft' && index > 0) {
            otpInputRef.current[index - 1].focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const clipboardValue = e.clipboardData.getData('text')
        if (/^[0-9]*$/.test(clipboardValue)) {
            const copyOtpFields = [...otpfields]
            for (let i = 0; i < copyOtpFields.length && i < clipboardValue.length; i++) {
                copyOtpFields[i] = clipboardValue[i]
            }
            setOtpFields(copyOtpFields)
        }
    }

    return (
        <div className='flex justify-center items-center'>
            <div className='flex gap-2'>
                {otpfields.map((_, index) => {
                    return (
                        <input
                            className='border w-10 h-10'
                            key={index}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={(e) => handlePaste(e)}
                            ref={(el) => otpInputRef.current[index] = el}
                            onChange={(e) => handleInputChange(e, index)}
                            value={otpfields[index]}
                            type="text"
                            style={{ paddingLeft: "20px" }}
                        />
                    );
                })}
            </div>
        </div>
    );
}