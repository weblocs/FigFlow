import React, {useState} from "react";
import { useDispatch } from "react-redux";
import {createNewCollection, setKeyboardNavigationOn} from "../features/pre-rendered-html-nodes"

export default function CreateNewPageInProject () {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");

    async function handleAddNewCollection(e) {
        e.preventDefault();
        if(input !== "") {
            dispatch(createNewCollection(input));
            setInput("");
        }
    };

    function handleFocus() {
        dispatch(setKeyboardNavigationOn(false));
    }

    function handleBlur() {
        dispatch(setKeyboardNavigationOn(true));
    }

    return (
        <form onSubmit={handleAddNewCollection} className="new-page-form">
            <input 
            value={input} 
            onFocus={handleFocus} 
            onBlur={handleBlur}  
            onChange={(e) => setInput(e.target.value)} 
            placeholder="New collection" />
            <button className="">Add</button>
        </form>
    )
}