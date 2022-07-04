import React, {useState} from "react";
import { useDispatch } from "react-redux";
import {createNewRichTextElement} from "../features/pre-rendered-html-nodes"

export default function CreateNewPageInProject (props) {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");

    async function handleAddNewPage(e) {
        e.preventDefault();
        dispatch(createNewRichTextElement(input));
        setInput("");
    };

    return (
        <form onSubmit={handleAddNewPage} className="new-page-form">
            <input className="" value={input} onChange={(e) => setInput(e.target.value)} placeholder="New element" />
            <button className="">Add</button>
        </form>
    )
}