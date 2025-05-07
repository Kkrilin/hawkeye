import { useState } from 'react'
import { checkboxList } from '../utils/nestedCheckBoxList'

export default function NestedCheckBoxList() {
    const [checkLists, setCheckLists] = useState(checkboxList)

    const toggleAllNestedChildNode = (list, value) => {
        for (let i = 0; i < list.length; i++) {
            list[i].checked = value
            toggleAllNestedChildNode(list[i].children, value)
        }
    }

    const dfs = (list, id, value, isFound) => {
        if (list.length === 0) return isFound
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                list[i].checked = value
                isFound = true
                toggleAllNestedChildNode(list[i].children, value)
                break;
            }
            isFound = dfs(list[i].children, id, value, isFound)
            if (isFound) break
        }
        return isFound
    }

    const getActiveChildCount = (list) => {
        if (list.length === 0) return 0;
        let count = 0;
        for (let i = 0; i < list.length; i++) {
            if (list[i].checked) {
                count++
            }
            if (list[i].children.length === 0) continue;
            const childCount = getActiveChildCount(list[i].children);
            if (childCount !== list[i].children.length) {
                count = list[i].checked ? count - 1 : count;
                list[i].checked = false;
            } else {
                count = list[i].checked ? count : count + 1;
                list[i].checked = true;
            }
        }
        return count
    }

    const handleChange = (id, value) => {
        const clone = structuredClone(checkLists);
        let isFound = false;
        let parentIndex = 0;
        for (let i = 0; i < clone.length; i++) {
            if (clone[i].id === id) {
                clone[i].checked = value
                isFound = true;
                parentIndex = i;
                toggleAllNestedChildNode(clone[i].children, value)
                break;
            }
            isFound = dfs(clone[i].children, id, value, false)
            if (isFound) {
                parentIndex = i;
                break;
            }
        }
        const childCount = getActiveChildCount(clone[parentIndex].children);
        if (clone[parentIndex].children.length > 0) {
            if (childCount !== clone[parentIndex].children.length) {
                clone[parentIndex].checked = false;
            } else {
                clone[parentIndex].checked = true;
            }
        }
        setCheckLists(clone);
    }
    return (
        <div className='flex justify-center items-center'>
            <div>
                <CheckBoxList handleChange={handleChange} checkLists={checkLists} />
            </div>
        </div>
    )
}



function CheckBoxList({ checkLists, handleChange }) {
    return (
        <>
            {checkLists.map(cl => {
                return (
                    < div key={cl.id} style={{ marginLeft: "20px" }}>
                        <label htmlFor={cl.id}>
                            <input onChange={() => handleChange(cl.id, !cl.checked)} checked={cl.checked} type="checkbox" id={cl.id} />
                            {cl.label}
                        </label>
                        {cl.children.length > 0 && <CheckBoxList handleChange={handleChange} checkLists={cl.children} />}
                    </div >)
            })}
        </>
    )
}