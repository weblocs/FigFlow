import React, {useState} from "react";
import { useDispatch } from "react-redux";
import {createNewCollectionField} from "../features/pre-rendered-html-nodes"

export default function CreateNewCollectionField () {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");

    async function handleAddNewCollectionField(e) {
        e.preventDefault();
        if(input !== "") {
            dispatch(createNewCollectionField(input));
            setInput("");
        }
    };

    return (
        <form onSubmit={handleAddNewCollectionField} className="new-page-form">
            <input className="" value={input} onChange={(e) => setInput(e.target.value)} placeholder="New field" />
            <button className="">Add</button>
            
        </form>
    )
}