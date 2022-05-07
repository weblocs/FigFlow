import React, {useState} from "react"
import { useDispatch } from 'react-redux'
import {addPreRenderedStyle} from "../features/pre-rendered-html-nodes"

export default function AddPreRenderedStyleForm() {

    const [newPreRenderStyleName, setNewPreRenderStyleName] = useState("");

    const dispatch = useDispatch()

    function handleAddingNewStyle(e) {
        e.preventDefault();
        dispatch(addPreRenderedStyle(newPreRenderStyleName))
        setNewPreRenderStyleName("");
    }

    return (
        <form onSubmit={handleAddingNewStyle}>
            <input placeholder="Add Style" value={newPreRenderStyleName} onChange={(e) => setNewPreRenderStyleName(e.target.value)} />
            <button>Add</button>
        </form>
    
    )
}