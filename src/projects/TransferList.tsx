import React, { useState } from 'react'
import { countriesData } from '../utils/transferList'


function getListData() {
    return countriesData.map(cou => {
        return {
            ...cou,
            selected: false,
            direction: 'left'
        }
    })
}


export default function TransferList() {
    const [list, setList] = useState(getListData())
    const leftList = list.filter(l => l.direction === 'left')
    const rightList = list.filter(l => l.direction === 'right')
    const selectedLeft = leftList.filter(l => l.selected)
    const selectedRight = rightList.filter(l => l.selected)


    const handleTransferAll = (to: string) => {
        const updatedItems = list.map(l => {
            return {
                ...l,
                direction: to
            }
        })
        setList(updatedItems)
    }
    const handleTransferSelected = (from: string, to: string) => {
        const updatedItems = list.map(l => {
            if (l.selected && l.direction === from) {
                return {
                    ...l,
                    selected: false,
                    direction: to
                }
            }
            return l
        })
        setList(updatedItems)
    }
    const handleToggle = (id: string) => {
        const updatedList = list.map(l => {
            if (l.id === id) {
                return {
                    ...l,
                    selected: !l.selected
                }
            }
            return l
        })
        setList(updatedList)
    }
    return (
        <div className='flex justify-center items-center'>
            <div className='flex w-100 gap-2 items-center min-h-40'>
                <div
                    className='border w-2/5 p-2'
                    style={{ minHeight: '20rem' }}
                >
                    <LeftList onToggle={handleToggle} left={leftList} />
                </div>
                <div className='flex flex-col gap-1'>
                    <button onClick={() => handleTransferAll("right")} type='button' disabled={leftList.length === 0} className='py-1 px-2  border'>{'>>'}</button>
                    <button onClick={() => handleTransferSelected("left", "right")} type='button' disabled={selectedLeft.length === 0} className='py-1 px-2  border'>{'>'}</button>
                    <button onClick={() => handleTransferSelected("right", "left")} type='button' disabled={selectedRight.length === 0} className='py-1 px-2  border'>{'<'}</button>
                    <button onClick={() => handleTransferAll("left")} type='button' disabled={rightList.length === 0} className='py-1 px-2  border'>{'<<'}</button>
                </div>
                <div
                    className='border w-2/5 p-2 h-full'
                    style={{ minHeight: '20rem' }}
                >
                    <RightList onToggle={handleToggle} right={rightList} />
                </div>
            </div>
        </div>
    )
}
interface LeftListProps {
    left: {
        selected: boolean;
        direction: string;
        value: string;
        id: string;
    }[]
    onToggle: (id: string) => void
}

const LeftList: React.FC<LeftListProps> = ({ left, onToggle }) => {
    return (
        <div className='flex flex-col gap-2'>
            {left.map((item, index) => (
                <label className='flex gap-1 items-center' htmlFor="item">
                    <input onChange={() => onToggle(item.id)} checked={item.selected} value={item.value} key={index} type="checkbox" />
                    {item.value}
                </label>
            ))}
        </div>
    );
}

interface RightListProps {
    right: {
        selected: boolean;
        direction: string;
        value: string;
        id: string;
    }[]
    onToggle: (id: string) => void
}

const RightList: React.FC<RightListProps> = ({ right, onToggle }) => {
    return (
        <div className='flex flex-col gap-2'>
            {right.map((item, index) => (
                <label className='flex gap-1 items-center' htmlFor="item">
                    <input onChange={() => onToggle(item.id)} checked={item.selected} value={item.value} key={index} type="checkbox" />
                    {item.value}
                </label>
            ))}
        </div>
    );
}