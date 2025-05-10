import { useState } from "react"
import { fileExplorerData } from "../utils/fileExplorer"

export interface NodeIntf {
    id: string;
    name: string;
    isFolder: boolean;
    nodes?: NodeIntf[];
}

export type NodeOrNull = NodeIntf | null;

export default function FileExplorer() {
    const [data, setData] = useState<NodeIntf>(fileExplorerData as NodeIntf)
    const onAdditon = (node: NodeIntf, parentNode: NodeIntf) => {
        const newData: NodeIntf = { ...data }
        const nodes = [...parentNode.nodes ?? []]
        nodes.push(node)
        if (parentNode.name === 'root') {
            newData.nodes?.push(node)
        } else {
            parentNode.nodes = nodes
        }
        setData(newData)
    }

    const onNodeRemove = (id: string, parentNode: NodeIntf) => {
        const newData = { ...data }
        console.log('parentNode', parentNode)
        const nodes = parentNode.nodes?.filter(node => node.id !== id)
        if ('root' === parentNode.id) {
            newData.nodes = nodes
        } else {
            parentNode.nodes = nodes
        }
        setData(newData)
    }

    const onNodeUpdate = (node: NodeIntf, parentNode: NodeIntf) => {
        const newData = { ...data }
        const nodeIndex = parentNode.nodes?.findIndex(nd => nd.id === node.id)
        if (nodeIndex === undefined) return
        if (parentNode.id === 'root' && newData.nodes) {
            newData.nodes[nodeIndex] = node
        } else {
            parentNode.nodes![nodeIndex] = node
        }
        setData(newData)
    }
    return (
        <div>
            <Tree onNodeUpdate={onNodeUpdate} onNodeRemove={onNodeRemove} onAdditon={onAdditon} node={data} parent={null} />
        </div>
    )
}

interface TreeProps {
    node: NodeIntf
    onAdditon: (node: NodeIntf, parentNode: NodeIntf) => void
    onNodeRemove: (id: string, parentNode: NodeIntf) => void
    parent: NodeOrNull
    onNodeUpdate: (node: NodeIntf, parentNode: NodeIntf) => void
}

function Tree({ node, onAdditon, onNodeRemove, parent, onNodeUpdate }: TreeProps) {
    const [expanded, setExpanded] = useState(false)
    const [newType, setNewType] = useState('')
    const addNew = (type: string) => {
        setExpanded(true)
        setNewType(type)
    }
    const parentNode = node
    const handleNewAddition = (type: string, value: string) => {
        if (!value) {
            setNewType('')
            return
        }
        const node = {
            id: Date.now().toString(),
            name: value,
            ...(type === 'folder' ? { isFolder: true, nodes: [] } : {})
        }
        setNewType('')
        onAdditon(node as NodeIntf, parentNode)
    }
    const handleNodeRemoval = (id: string, parent: NodeIntf) => {
        onNodeRemove(id, parent)
    }
    const handleNodeUpdation = (node: NodeIntf, parent: NodeIntf) => {
        onNodeUpdate(node, parent)
    }


    const onExpand = () => {
        setExpanded((prv) => !prv)
        setNewType('')
    }

    return (
        <div className="mx-10">
            <Folder handleNodeUpdation={(node) => handleNodeUpdation(node, parent as NodeIntf)} handleNodeRemoval={() => handleNodeRemoval(node.id, parent as NodeIntf)} addNew={addNew} onExpand={onExpand} expanded={expanded} node={node} />
            {expanded &&
                node.nodes?.map(childNode => (
                    childNode.isFolder ?
                        <Tree key={childNode.id} onNodeUpdate={onNodeUpdate} onNodeRemove={onNodeRemove} onAdditon={onAdditon} node={childNode} parent={node} />
                        :
                        <File key={childNode.id} handleNodeUpdation={(updateNode) => handleNodeUpdation(updateNode, node)} handleNodeRemoval={(id) => handleNodeRemoval(id, node)} node={childNode} />
                ))
            }
            {newType && expanded && <EditInput handleNewAddition={handleNewAddition} type={newType} />}
        </div>
    )
}

interface FolderProps {
    node: NodeIntf
    expanded: boolean
    addNew: (type: string) => void
    onExpand: () => void
    handleNodeRemoval: (id: string) => void
    handleNodeUpdation: (node: NodeIntf) => void
}

function Folder({ node, expanded, onExpand, addNew, handleNodeRemoval, handleNodeUpdation }: FolderProps) {
    const [value, setValue] = useState('')
    const [isEditing, setIsEditing] = useState(false)

    const handleEdit = (value: string) => {
        handleNodeUpdation({
            ...node,
            name: value
        })
        setValue('')
        setIsEditing(false)

    }
    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>, value: string) => {
        if (e.key === 'Enter') {
            handleEdit(value)
            setIsEditing(false)
        }
    }

    if (isEditing) {
        return (
            <input onKeyUp={(e) => handleKeyUp(e, value)} onBlur={() => handleEdit(value)} onChange={(e) => setValue(e.target.value)} autoFocus className="border px-4 text-2xl text-black" value={value} type="text" />
        )
    }

    return (
        <div data-root={node.name === 'root'} className="folder flex items-center gap-20 my-1" >
            <div
                onClick={onExpand}
                className="text-2xl flex gap-2 items-center"> <button>{expanded ? '📂' : '📁'}</button> {node.name}</div>
            <div className="control flex gap-5" >
                <button onClick={() => {
                    setIsEditing(true)
                    setValue(node.name)
                }
                }> ✏️</button>
                <button onClick={() => addNew('file')}> 📄</button>
                <button onClick={() => addNew('folder')}> 🗂</button>
                <button onClick={() => handleNodeRemoval(node.id)}> 🗑️</button>
            </div>
        </div>
    )
}

interface FileNode {
    node: NodeIntf
    handleNodeRemoval: (id: string) => void
    handleNodeUpdation: (node: NodeIntf) => void
}


function File({ node, handleNodeRemoval, handleNodeUpdation }: FileNode) {
    const [value, setValue] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const handleEdit = (value: string) => {
        handleNodeUpdation({
            ...node,
            name: value
        })
        setValue('')
        setIsEditing(false)
    }
    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>, value: string) => {
        if (e.key === 'Enter') {
            handleEdit(value)
            setIsEditing(false)

        }
    }

    if (isEditing) {
        return (
            <input onKeyUp={(e) => handleKeyUp(e, value)} onBlur={() => handleEdit(value)} onChange={(e) => setValue(e.target.value)} autoFocus className="border px-4 text-2xl mx-10 my-1 text-black" value={value} type="text" />
        )
    }
    return (
        <div className="file flex items-center gap-20 mx-10 my-1">
            <div className="text-2xl flex gap-2 items-center"><button>📄</button>{node.name}</div>
            <div className="control flex gap-5" >
                <button onClick={() => {
                    setValue(node.name)
                    setIsEditing(true)
                }
                }> ✏️</button>
                <button onClick={() => handleNodeRemoval(node.id)}> 🗑️</button>
            </div>
        </div>
    )
}

interface EditInputProps {
    type: string
    handleNewAddition: (type: string, value: string) => void
}

function EditInput({ type, handleNewAddition }: EditInputProps) {
    const [inputValue, setInputValue] = useState('')

    const handleInputBlur = () => {

        handleNewAddition(type, inputValue)
    }
    const HandleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!inputValue) return
        if (e.key === 'Enter') {
            handleNewAddition(type, inputValue)
        }

    }
    return (
        <div className="mx-10 text-2xl flex gap-2 items-center">
            {type == "folder" ? '📁' : '📄'}
            <input onKeyUp={(e) => HandleKeyUp(e)} onBlur={() => handleInputBlur()} onChange={(e) => setInputValue(e.target.value)} autoFocus className="border px-4 text-2xl text-black" type="text" />
        </div>
    )
}