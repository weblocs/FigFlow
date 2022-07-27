import React, {useState} from "react";
import { useDispatch } from "react-redux";
import {createNewCollectionItems} from "../features/pre-rendered-html-nodes"

export default function CreateNewCollectionItem () {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");

    async function handleAddNewCollectionItem(e) {
        e.preventDefault();
        if(input !== "") {
            dispatch(createNewCollectionItems(input));
            setInput("");
        }
    };

    return (
        <form onSubmit={handleAddNewCollectionItem} className="new-page-form">
            <input className="" value={input} onChange={(e) => setInput(e.target.value)} placeholder="New item" />
            <button className="">Add</button>     
        </form>
    )
}