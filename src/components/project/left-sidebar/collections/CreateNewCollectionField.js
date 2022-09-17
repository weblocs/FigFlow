import React, {useState} from "react";
import { useDispatch } from "react-redux";
import {createNewCollectionField} from "../../../../features/pre-rendered-html-nodes"

export default function CreateNewCollectionField () {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");
    const [typeInput, setTypeInput] = useState("text");

    async function handleAddNewCollectionField(e) {
        e.preventDefault();
        if(input !== "") {
            dispatch(createNewCollectionField({name: input, type:typeInput}));
            setInput("");
        }
    };

    return (
        <form onSubmit={handleAddNewCollectionField} className="new-page-form">
            <div>
                <input className="" value={input} onChange={(e) => setInput(e.target.value)} placeholder="New field" />
                <select value={typeInput} onChange={(e) => setTypeInput(e.target.value)}>
                    <option value="text">Text</option>
                    <option value="img">Image</option>
                </select>
            </div>
            <button className="">Add</button>
            
        </form>
    )
}