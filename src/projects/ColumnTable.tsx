import React, { useState } from 'react'

function createMatrix(rows: number, columns: number) {
    const matrix: number[][] = Array.from(Array(rows), () => []);

    let count = 1, direction = 1, i = 0, j = 0;
    while (j < columns) {
        while (i < rows && i >= 0) {
            matrix[i][j] = count++;
            i += direction;
        }
        direction *= -1;
        i += direction;
        j += 1;
    }

    return matrix;
}

export default function ColumnTable() {
    const [row, setRow] = useState(2)
    const [col, setCol] = useState(2)

    const values = createMatrix(row, col)
    return (
        <div className='flex flex-col justify-center items-center gap-4'>
            <div>
                <Size setRow={setRow} setCol={setCol} row={row} col={col} />
            </div>
            <MyTable values={values} />
        </div>
    )
}

interface MyTablePropes {
    values: number[][]
}

const MyTable = ({ values }: MyTablePropes) => {
    console.log('values', values)
    return (
        <div style={{
            display: "grid",
            gap: "8px"
        }}>
            {values.map((row) => (
                <div className=' flex gap-2'>
                    {row.map((col) => (
                        <div className='flex justify-center items-center' style={{ border: "1px solid black", width: "4rem", height: "4rem" }}>{col}</div>
                    ))}
                </div>
            ))}
        </div>
    )
}


interface SizeProps {
    setRow: React.Dispatch<React.SetStateAction<number>>,
    setCol: React.Dispatch<React.SetStateAction<number>>,
    row: number,
    col: number
}

const Size = ({ setRow, setCol, row, col }: SizeProps) => {
    return (
        <div className='flex gap-4'>
            <label className='flex justify-center items-center gap-2' htmlFor="row">
                Rows:: {row}
                <input onChange={(e) => setRow(+e.target.value)} value={row} id='row' type="range" min={2} max={8} />
            </label>
            <label className='flex justify-center items-center gap-2' htmlFor="col">
                Columns:: {col}
                <input onChange={(e) => setCol(+e.target.value)} value={col} id='col' type="range" min={2} max={8} />
            </label>
        </div>
    )
}