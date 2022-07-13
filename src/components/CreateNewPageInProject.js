import React, {useState} from "react";
import { useDispatch } from "react-redux";
import {createNewPageInProject, setArrowNavigationOn} from "../features/pre-rendered-html-nodes"

export default function CreateNewPageInProject (props) {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");

    async function handleAddNewPage(e) {
        e.preventDefault();
        if(input !== "") {
            dispatch(createNewPageInProject(input));
        }
        setInput("");
    };

    function handleFocus() {
        dispatch(setArrowNavigationOn(false));
    }

    function handleBlur() {
        dispatch(setArrowNavigationOn(true));
    }

    return (
        <form onSubmit={handleAddNewPage} className="new-page-form">
            <input className="" value={input} onFocus={handleFocus} onBlur={handleBlur} onChange={(e) => setInput(e.target.value)} placeholder="New page" />
            <button className="">Add</button>
        </form>
    )
}