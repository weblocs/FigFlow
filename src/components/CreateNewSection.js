import React, {useState} from "react";
import { useDispatch } from "react-redux";
import {createNewSection, setKeyboardNavigationOn} from "../features/pre-rendered-html-nodes"

export default function CreateNewSection (props) {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");

    function onInputKeyDown() {
        dispatch(setKeyboardNavigationOn(false));   
    }
    
    function onInputBlur() {
        dispatch(setKeyboardNavigationOn(true));
    }

    function onInputChange(e) {
        setInput(e.target.value);
    }

    async function handleAddNewPage(e) {
        e.preventDefault();
        dispatch(createNewSection(input));
        setInput("");
    };

    return (
        <form onSubmit={handleAddNewPage} className="new-page-form">
            <input className="" value={input} onChange={onInputChange} onKeyDown={onInputKeyDown} onBlur={onInputBlur} placeholder="New section" />
            <button className="">Add</button>
        </form>
    )
}