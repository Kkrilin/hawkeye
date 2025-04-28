import { useState } from "react"

export default function ChessBoard() {
    const [click, setClick] = useState(false)
    const [i, setI] = useState(0)
    const [j, setJ] = useState(0)
    const style = {
        width: '80px',
        height: '80px',
        border: '1px solid black',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: `${click ? 'red' : "white"}`
    }
    function handleClick(a: number, b: number) {
        setI(a)
        setJ(b)
        setClick(true)
        // e.currentTarget.style.backgroundColor = '#FEF3C6'

    }

    return (
        <div className="flex flex-col justify-center items-center gap-15">
            <h1 className="text-center text-4xl">ChessBoard</h1>
            <div>
                {Array.from({ length: 8 }, (_, a) => (
                    <div key={a} style={{ display: 'flex' }}>
                        {Array.from({ length: 8 }, (_: unknown, b: number) => (
                            <div onClick={() => handleClick(a, b)} key={b}
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    border: '1px solid black',
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: `${click && (b - a === j - i || b + a === j + i) && a !== i && b !== j
                                        ? 'red'
                                        : click && a === i && b === j
                                            ? "#FEF3C6"
                                            : "white"}`
                                }}>
                                {(a + 1)} ,{(b + 1)}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}