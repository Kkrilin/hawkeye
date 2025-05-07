import { useState } from 'react'


export default function ChipsInput() {
    const [todos, setTodos] = useState<string[]>([])
    const [value, setValue] = useState('')

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(e.key)
        if (e.key === "Enter") {
            setTodos(prev => [...prev, value])
            setValue('')
        }
    }

    const handleDelete = (i) => {
        setTodos(prve => prve.filter((_, index) => index !== i))
    }
    return (
        <div>
            <input value={value} className='text-2xl border w-200 px-4 h-12 rounded-md' onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} placeholder='Type & hit Enter' type="text" />
            <div className='flex flex-wrap  my-2'>
                {todos.map((td, i) => <span className='border -my-1 mx-1 py-2 px-4 rounded-2xl bg-white'>{td} <span onClick={() => handleDelete(i)} className='text-red-500'>X</span></span>)}
            </div>
        </div>
    )
}