import React, {useState} from "react";
import { useDispatch } from "react-redux";
import {createNewSymbol} from "../features/pre-rendered-html-nodes"

export default function CreateNewSymbol (props) {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");

    async function handleAddNewPage(e) {
        e.preventDefault();
        dispatch(createNewSymbol(input));
        setInput("");
    };

    return (
        <form onSubmit={handleAddNewPage} className="new-page-form">
            <input className="" value={input} onChange={(e) => setInput(e.target.value)} placeholder="New symbol" />
            <button className="">Add</button>
        </form>
    )
}