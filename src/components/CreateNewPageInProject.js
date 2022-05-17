import React, {useState} from "react";
import { useDispatch } from "react-redux";
import {createNewPageInProject} from "../features/pre-rendered-html-nodes"

export default function CreateNewPageInProject (props) {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");

    async function handleAddNewPage(e) {
        e.preventDefault();
        dispatch(createNewPageInProject(input));
        setInput("");
    };
        
        // check if in database we don't have same slug
        // let sameNameProjects = await getDocs( query( collection(db, "projects"), where("projectId", "==", pageSlug)));
        // let projectSufixIndex = 1;
        // let initialpageSlug = pageSlug;
        // while(sameNameProjects.size > 0) {
        //     projectSufixIndex++;
        //     pageSlug = initialpageSlug + '-'+projectSufixIndex;
        //     sameNameProjects = await getDocs( query( collection(db, "projects"), where("projectId", "==", pageSlug)));
        // } 
    

    return (
        <form onSubmit={handleAddNewPage} className="new-page-form">
            <input className="" value={input} onChange={(e) => setInput(e.target.value)} placeholder="New page" />
            <button className="">Add</button>
        </form>
    )
}