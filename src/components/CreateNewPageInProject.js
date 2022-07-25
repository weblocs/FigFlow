import React, {useState} from "react";
import { useDispatch } from "react-redux";
import {createNewPageFolder, createNewPageInProject, setKeyboardNavigationOn} from "../features/pre-rendered-html-nodes"

export default function CreateNewPageInProject (props) {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");
    const [folderInput, setFolderInput] = useState("");

    async function handleAddNewPage(e) {
        e.preventDefault();
        if(input !== "") {
            dispatch(createNewPageInProject(input));
        }
        setInput("");
    };

    async function handleAddNewPageFolder(e) {
        e.preventDefault();
        if(folderInput !== "") {
            dispatch(createNewPageFolder(folderInput));
        }
        setFolderInput("");
    };

    function handleFocus() {
        dispatch(setKeyboardNavigationOn(false));
    }

    function handleBlur() {
        dispatch(setKeyboardNavigationOn(true));
    }

    return (
        <div>
            <form onSubmit={handleAddNewPageFolder} className="new-page-form">
                <input className="" value={folderInput} onFocus={handleFocus} onBlur={handleBlur} onChange={(e) => setFolderInput(e.target.value)} placeholder="New folder" />
                <button className="">Add</button>
            </form>
            <form onSubmit={handleAddNewPage} className="new-page-form">
                <input className="" value={input} onFocus={handleFocus} onBlur={handleBlur} onChange={(e) => setInput(e.target.value)} placeholder="New page" />
                <button className="">Add</button>
            </form>
        </div>
    )
}