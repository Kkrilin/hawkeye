import { useState } from 'react'

import { quiz } from '../utils/quiz.json'
import { lightBlue } from '@mui/material/colors'



export default function QuizApp() {
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [answerSelect, setAnswerSelect] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<null | number>(null)
    const [result, setResult] = useState({
        score: 0,
        wrongAnswer: 0,
        correctAnswer: 0
    })
    const { questions, topic } = quiz
    const { question, choices, correctAnswer } = questions[activeQuestion];


    const HandleNextClick = () => {
        setSelectedAnswerIndex(null)
        setResult((prvState => {
            return answerSelect ?
                {
                    ...prvState,
                    score: prvState.score + 5,
                    correctAnswer: prvState.correctAnswer + 1
                } : { ...prvState, wrongAnswer: prvState.wrongAnswer + 1 }
        }))
        if (activeQuestion !== questions.length - 1) {
            setActiveQuestion((prev) => prev + 1)
        } else {
            setActiveQuestion(0)
            setShowResult(true)
        }
    }

    const onAnswerSelect = (choice: string, index: number) => {
        setSelectedAnswerIndex(index)
        if (choice === correctAnswer) {
            setAnswerSelect(true)
        } else {
            setAnswerSelect(false)
        }
    }

    return (
        <div className='bg-amber-800 h-11/12 m-2 rounded-2xl flex justify-center items-center'>
            {!showResult ?
                <div className=' w-200 h-100 bg-green-900 p-3'>
                    <h1 className='text-white'>{topic}</h1>
                    <div className='p-4'>
                        <h1 className='text-white'>{question}</h1>
                        <div className='flex flex-col gap-2'>
                            {choices.map((choice, i) => (
                                <p
                                    onClick={() => onAnswerSelect(choice, i)}
                                    className='p-3 bg-blue-500 rounded-lg hover:opacity-85 cursor-pointer'
                                    style={{
                                        backgroundColor: selectedAnswerIndex === i ? '#445E97' : '#5D88D5'
                                    }}
                                >
                                    {i + 1}. {choice}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className='flex justify-end p-4'>
                        <button
                            disabled={selectedAnswerIndex === null}
                            onClick={HandleNextClick}
                            type='button'
                            className='py-2 px-4 text-white rounded-2xl cursor-pointer hover:opacity-90'
                            style={{
                                cursor: selectedAnswerIndex === null ? "not-allowed" : 'pointer',
                                backgroundColor: selectedAnswerIndex === null ? "gray" : '#461901',
                            }}
                        >
                            {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                        </button>
                    </div>
                </div>
                :
                <div className='flex flex-col gap-2 items-start'>
                    <h1 className='text-center p-2 border border-solid'>Result</h1>
                    <h3>Total questions {result.correctAnswer + result.wrongAnswer}</h3>
                    <h3>Correct Answers {result.correctAnswer}</h3>
                    <h3>Wrong Answers {result.wrongAnswer}</h3>
                </div>}
        </div>
    )
}