import React, {useState} from "react";
import { useDispatch } from "react-redux";
import {createNewCollection} from "../features/pre-rendered-html-nodes"

export default function CreateNewCollection () {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");

    async function handleAddNewCollection(e) {
        e.preventDefault();
        dispatch(createNewCollection(input));
        setInput("");
    };

    return (
        <form onSubmit={handleAddNewCollection} className="new-page-form">
            <input className="" value={input} onChange={(e) => setInput(e.target.value)} placeholder="New collection" />
            <button className="">Add</button>
        </form>
    )
}