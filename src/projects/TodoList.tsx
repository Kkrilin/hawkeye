import React, { useRef, useState } from 'react'

type Todo = {
    id: number | string,
    text: string,
    completed: boolean

}

const intialState = { id: '', text: '', completed: false }

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [value, setValue] = useState<Todo>(intialState)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(prve => {
            return {
                ...prve,
                ...(prve.id ? { id: prve.id } : { id: Date.now() }),
                text: e.target.value
            }
        })

    }

    const addTask = () => {
        setTodos(prve => {
            let isFound = false
            const newState = prve.map(td => {
                if (td.id === value.id) {
                    isFound = true
                    return {
                        ...value,
                        completed: false
                    }
                }
                return { ...td }
            })
            if (!isFound) {
                newState.push(value)
            }
            return newState
        })
        setValue(intialState)
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (value.text.trim() === '') return
        if (e.key === 'Enter') {
            addTask()
        }
        console.log(e.key)
        if (e.key == 'Escape') {
            if (inputRef.current) {
                inputRef.current.blur()
            }
            setValue(intialState)
        }
    }

    const handleDoubleClick = (id: number | string) => {
        setTodos(prve => {
            return prve.map((t) => {
                if (t.id === id) {
                    return {
                        ...t,
                        completed: !t.completed
                    }
                }
                return { ...t }
            })
        })
    }

    const handleDelete = (id) => {
        setTodos(prve => {
            return prve.filter((t) => {
                if (t.id === id) {
                    return false
                }
                return true
            })
        })
    }
    return (
        <div>
            <div>
                <input ref={inputRef} className='w-250 border rounded-md h-14 px-4' onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => handleInputChange(e)} value={value.text} type="text" name="todo" placeholder='Enter your todo' />
                <div className='flex gap-2 my-2'>
                    <button
                        onClick={() => addTask()}
                        disabled={Boolean(!value.text)}
                        style={{
                            borderRadius: "10px",
                            padding: "10px 16px",
                            color: value.text ? "white" : "black",
                            backgroundColor: value.text ? "blue" : "grey",
                            cursor: value.text ? "pointer" : "not-allowed"
                        }}
                    >Submit</button>
                    <button
                        onClick={() => setValue(intialState)}
                        disabled={Boolean(!value.text)}
                        style={{
                            borderRadius: "10px",
                            padding: "10px 16px",
                            color: value.text ? "white" : "black",
                            backgroundColor: value.text ? "blue" : "grey",
                            cursor: value.text ? "pointer" : "not-allowed"

                        }}
                    >cancel</button>
                </div>
                <div>
                    <i>Double click on todo to toggle completion status</i>
                </div>
                <div className='w-250'>
                    {todos.map((todo, i) => (
                        <div className='flex justify-between my-4' key={todo.id}>
                            <p
                                onDoubleClick={() => handleDoubleClick(todo.id)}
                                style={{
                                    textDecoration: todo.completed ? 'line-through' : "none",
                                }}
                            >{todo.text}</p>
                            <div className='flex gap-4'>
                                <button
                                    onClick={() => setValue(todo)}
                                    style={{
                                        borderRadius: "10px",
                                        padding: "10px 16px",
                                        color: "white",
                                        backgroundColor: "green",
                                        cursor: "pointer",
                                    }}
                                >edit</button>
                                <button
                                    onClick={() => handleDelete(todo.id)}
                                    style={{
                                        borderRadius: "10px",
                                        padding: "10px 16px",
                                        color: "white",
                                        backgroundColor: "red",
                                        cursor: "pointer",
                                    }}
                                >Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}