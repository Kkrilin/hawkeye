import { useState } from "react"


export default function Calculator() {
    const [first, setFirst] = useState('')
    const [second, setSecond] = useState('')
    const [operator, setOperator] = useState('')
    const [result, setResult] = useState('')
    const [equalBtn, setEqualBtn] = useState(false)
    let decimalPlaces = '';
    const setNumber = (value: string) => {
        if (!operator && equalBtn) {
            setFirst(value)
            setEqualBtn(false)
        } else if (!operator) {
            if (first.includes('.') && value === '.') return
            setFirst(prv => prv + value)
        }

        if (operator && operator !== '^2') {
            if (second.includes('.') && value === '.') return
            else {
                setSecond(prv => prv + value)
            }
        }
    }
    const setOpeartion = (operator: string) => {
        if (!first) {
            setOperator('')
        } else {
            setOperator(operator)
        }
    }
    const displayEquation = () => {
        if (first) {
            return `${first} ${operator} ${second}`
        }
        return `${first} ${operator || '-'} ${second} `
    }

    const returnAndResetEquation = (value) => {
        setResult(value);
        setFirst(value);
        setSecond('');
        setOperator('');
        setEqualBtn(true);
    };

    const decimalFormat = () => {
        if (!first.includes('.') && !second.includes('.')) return
        const firstIncludeDot = first.includes('.')
        const secondIncludeDot = second.includes('.')
        if (operator === '^2') {
            if (firstIncludeDot) {
                const firstSplit = first.split('.')
                const firstDecimals = firstSplit[1].length
                decimalPlaces = firstDecimals
            }
        } else if (operator === '*') {
            if (firstIncludeDot && secondIncludeDot) {
                const firstSplit = first.split('.')
                const firstDecimals = firstSplit[1].length
                const secondSplit = second.split('.')
                const secondDecimals = secondSplit[1].length
                decimalPlaces = firstDecimals + secondDecimals
            } else if (firstIncludeDot) {
                const firstSplit = first.split('.')
                const firstDecimals = firstSplit[1].length
                decimalPlaces = firstDecimals
            } else if (secondIncludeDot) {
                const secondSplit = second.split('.')
                const secondDecimals = secondSplit[1].length
                decimalPlaces = secondDecimals

            }
        } else if (firstIncludeDot && secondIncludeDot) {
            const firstSplit = first.split('.')
            const firstDecimals = firstSplit[1].length
            const secondSplit = second.split('.')
            const secondDecimals = secondSplit[1].length
            decimalPlaces = Math.min(firstDecimals, secondDecimals)
        } else if (firstIncludeDot) {
            const firstSplit = first.split('.')
            const firstDecimals = firstSplit[1].length
            decimalPlaces = firstDecimals
        } else if (secondIncludeDot) {
            const secondSplit = second.split('.')
            const secondDecimals = secondSplit[1].length
            decimalPlaces = secondDecimals

        }
    }

    const calculate = () => {
        console.log(first, second, operator)
        if (!second && operator !== '^2') return
        if (operator === '/') {
            const quotient = parseFloat(first) / parseFloat(second)
            returnAndResetEquation(quotient)
        } else if (operator === '-') {
            decimalFormat()
            const difference = ((parseFloat(first) * parseFloat(second)) * 100).toFixed(Number(decimalPlaces))
            returnAndResetEquation(difference)
        } else if (operator === '*') {
            decimalFormat()
            const product = (first * second).toFixed(Number(decimalPlaces))
            returnAndResetEquation(product)
        } else if (operator === '+') {
            console.log(first, second, operator)
            decimalFormat()
            const sum = (parseFloat(first) + parseFloat(second)).toFixed(Number(decimalPlaces))
            returnAndResetEquation(sum)
        } else if (operator === '^') {
            const answer = Math.pow(first, second);
            returnAndResetEquation(String(answer));
        } else if (operator === '^2') {
            let answer = Math.pow(first, 2);
            decimalFormat();
            answer = answer.toFixed(Number(decimalPlaces));
            returnAndResetEquation(answer);
        } else if (operator === '√') {
            const answer = Math.sqrt(first);
            returnAndResetEquation(answer);
        }
    }

    const reset = () => {
        setFirst('')
        setSecond('')
        setOperator('')
        setResult('')
    }

    const deleteNumber = () => {
        if (!operator) {
            setFirst(prv => prv.slice(0, prv.length))
        } else {
            setSecond(prv => prv.slice(0, prv.length))
        }
    }

    const toggleNegative = () => {
        if (second) {
            setSecond(prve => prve * -1)
        } else if (first) {
            setFirst(prve => prve * -1)
        }
    }
    return (
        <div className="flex justify-center items-center">
            <div className="max-w-max bg-stone-400 rounded-2xl w-86">
                <div className="py-8 px-4">
                    <div>
                        <div className=" flex flex-col justify-around w-full bg-black text-white rounded-xl my-2 px-3 h-20">
                            <h3 className="text-xl text-right">{displayEquation()}</h3>
                            <h3 className="text-2xl text-right">{result}</h3>
                        </div>
                        <div className="buttonContainer flex gap-2 flex-wrap">
                            <button onClick={() => reset()} style={{ backgroundColor: '#EB6440' }} className="cursor-pointer  transition-transform  text-white text-2xl rounded-xl w-18 h-18 hover:scale-105" >Clear</button>
                            <button onClick={() => deleteNumber()} style={{ backgroundColor: '#EB6440' }} className="cursor-pointer  transition-transform  text-white text-2xl rounded-xl w-18 h-18 hover:scale-105" >Del</button>
                            <button onClick={() => toggleNegative()} style={{ backgroundColor: '#EB6440' }} className="cursor-pointer  transition-transform  text-white text-2xl rounded-xl w-18 h-18 hover:scale-105" >+-</button>
                            <button onClick={() => setOperator('^2')} style={{ backgroundColor: "#EB6440" }} className="cursor-pointer transition-transform hover:scale-105 text-white text-2xl rounded-xl w-18 h-18" >x < sup style={{}} >2</sup></button>
                            <NumberButton setNumber={setNumber} number="1" bgColor="#497174" />
                            <NumberButton setNumber={setNumber} number="2" bgColor="#497174" />
                            <NumberButton setNumber={setNumber} number="3" bgColor="#497174" />
                            <Button setOpeartion={setOpeartion} action="+" bgColor="#EB6440" />
                            <NumberButton setNumber={setNumber} number="4" bgColor="#497174" />
                            <NumberButton setNumber={setNumber} number="5" bgColor="#497174" />
                            <NumberButton setNumber={setNumber} number="6" bgColor="#497174" />
                            <Button setOpeartion={setOpeartion} action="/" bgColor="#EB6440" />
                            <NumberButton setNumber={setNumber} number="7" bgColor="#497174" />
                            <NumberButton setNumber={setNumber} number="8" bgColor="#497174" />
                            <NumberButton setNumber={setNumber} number="9" bgColor="#497174" />
                            <Button setOpeartion={setOpeartion} action="-" bgColor="#EB6440" />
                            <NumberButton setNumber={setNumber} number="0" bgColor="#497174" />
                            <button onClick={() => setOperator('^')} style={{ backgroundColor: "#EB6440" }} className="cursor-pointer transition-transform hover:scale-105 text-white text-2xl rounded-xl w-18 h-18" >x < sup style={{ marginLeft: "-5px" }} >y</sup></button>
                            <Button setOpeartion={setOpeartion} action="√" bgColor="#EB6440" />
                            <Button setOpeartion={setOpeartion} action="*" bgColor="#EB6440" />
                            <NumberButton setNumber={setNumber} number="." bgColor="#497174" />
                            <button onClick={calculate} style={{ backgroundColor: "#EB6440" }} className="cursor-pointer transition-transform hover:scale-105 text-white text-2xl rounded-xl w-18 h-18" >=</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

interface ButtonProps {
    action?: string
    bgColor: string
    number?: string
    setNumber?: (value: string) => void
    setOpeartion?: (operator: string) => void
}


const NumberButton = ({ number, bgColor, setNumber }: ButtonProps) => {
    return <button onClick={() => setNumber && setNumber(number as string)} style={{ backgroundColor: bgColor }} className="cursor-pointer  transition-transform  text-white text-2xl rounded-xl w-18 h-18 hover:scale-105" >{number}</button>
}
const Button = ({ action, bgColor, setOpeartion }: ButtonProps) => {
    return <button onClick={() => setOpeartion && setOpeartion(action as string)} style={{ backgroundColor: bgColor }} className="cursor-pointer  transition-transform  text-white text-2xl rounded-xl w-18 h-18 hover:scale-105" >{action}</button>
}