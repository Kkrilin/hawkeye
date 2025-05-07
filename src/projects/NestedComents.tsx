import React, { useState } from 'react'
import { Avatar } from '@mui/material'
import initialData, { Comment } from '../utils/nestedComment'


export default function NestedComentsApp() {
    const [comments, setComments] = useState(initialData)
    const [value, setValue] = useState('')

    const addComment = (id: number, text: string) => {
        if (id === -1) {
            setComments(prve => {
                const newState = JSON.parse(JSON.stringify(prve))
                newState.unshift({ id: Date.now(), text, replies: [] })
                return newState
            })
        } else {
            console.log(id, text, '111111')
            setComments(prve => {
                const newState = JSON.parse(JSON.stringify(prve))
                addCommentToTree(newState, id, text)
                return newState
            })
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addComment(-1, value)
            setValue('')
        }
        if (e.key === 'Escape') {
            setValue('');
        }
    }

    const handleDelete = (commentId: number) => {
        setComments(prv => {
            const newState = JSON.parse(JSON.stringify(prv))
            removeCommentFromTree(newState, commentId)
            return newState
        })
    }

    const addCommentToTree = (tree: Comment[], id: number, text: string) => {
        for (const node of tree) {
            if (node.id === id) {
                node.replies.unshift({
                    id: Date.now(),
                    text,
                    replies: []
                })
                return true
            }
            if (addCommentToTree(node.replies, id, text)) return true
        }
        return false
    }

    const removeCommentFromTree = (tree: Comment[], id: number) => {
        for (let i = 0; i < tree.length; i++) {
            if (tree[i].id == id) {
                tree.splice(i, 1)
                return true
            }
            if (removeCommentFromTree(tree[i].replies, id)) return true;
        }
        return false
    }



    return (
        <div >
            <div>
                <h1 className='text-2xl my-4'>Comments</h1>
                <input
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                    value={value}
                    placeholder='Add comment'
                    type="text"
                    className='border px-2 h-10 rounded-2xl'
                />
                <button onClick={() => {
                    addComment(-1, value)
                    setValue('')
                }} className='mx-3 py-1 px-2 bg-amber-900 text-white rounded-md' type="button">Add</button>
            </div>
            <div style={{ overflowY: "auto", height: "75vh" }} className='m-6'>
                <Comments comments={comments} addComment={addComment} deleteComment={handleDelete} />
            </div>
        </div>
    )
}

interface CommentsProps {
    comments: Comment[]
    addComment: (id: number, text: string) => void
    deleteComment: (commentId: number) => void
}

function Comments({ comments, addComment, deleteComment }: CommentsProps) {
    const [showInput, setShowInput] = useState(-1);
    const [value, setValue] = useState('')

    const handleAdd = (commentId: number) => {
        if (value) {
            addComment(commentId, value)
            setShowInput(-1)
        }
        setValue('')
    }

    const cancelReply = () => {
        setShowInput(-1);
        setValue('');
    };
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, commentId: number) => {
        if (e.key === 'Enter') handleAdd(commentId);
        else if (e.key === 'Escape') cancelReply();
    };
    return (
        <div
            style={{ margin: "2px 0 0 12px" }}
        >
            {comments.map((com) => {
                return (
                    <div key={com.id}>
                        <div
                            style={{ marginTop: "2px" }}
                            className='bg-cyan-950 text-white flex p-4 gap-4 rounded-md' key={com.id}>
                            <Avatar></Avatar>
                            <div>
                                <p>{com.text}</p>
                                <div className='flex gap-4 mx-2 my-2'>
                                    {showInput === com.id &&
                                        <input onKeyDown={(e) => onKeyDown(e, com.id)} autoFocus className='border px-2 h-6 rounded-md' value={value} onChange={(e) => setValue(e.target.value)} type="text" placeholder='Reply...' />
                                    }
                                    {showInput === com.id ?
                                        <>
                                            <button onClick={() => handleAdd(com.id)}>Add</button>
                                            <button onClick={() => cancelReply()}>cancel</button>
                                        </>
                                        :
                                        <>
                                            <button onClick={() => setShowInput(com.id)}>Reply</button>
                                            <button onClick={() => deleteComment(com.id)}>Delete</button>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                        {com.replies.length > 0 && <Comments addComment={addComment} comments={com.replies} deleteComment={deleteComment} />}
                    </div>
                )
            })}
        </div>
    )
}