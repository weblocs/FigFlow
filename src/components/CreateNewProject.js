import React, {useState} from "react";
import { v4 as uuidv4 } from "uuid";

import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, setDoc, doc, where,query, collection } from "firebase/firestore";
import { firebaseConfig } from "../utils/firebase-config";

export default function CreateNewProject (props) {
    const [input, setInput] = useState("");
    const newProjectId = uuidv4();
    const firstPageInProjectId = uuidv4();
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    async function addNewProject(e) {
        e.preventDefault();

        let projectSlug = input.toLowerCase().replaceAll(" ","-");
        let sameNameProjects = await getDocs( query( collection(db, "projects"), where("projectId", "==", projectSlug)));
        
        // check if in database we don't have same slug
        let projectSufixIndex = 1;
        let initialProjectSlug = projectSlug;
        while(sameNameProjects.size > 0) {
            projectSufixIndex++;
            projectSlug = initialProjectSlug + '-'+projectSufixIndex;
            sameNameProjects = await getDocs( query( collection(db, "projects"), where("projectId", "==", projectSlug)));
        } 
        
        await setDoc(doc(collection(db, "projects"), newProjectId), {
            projectId: projectSlug,
            projectName: input,
            userid: props.userid,
            pages: [{pageName: "Home", pageId: firstPageInProjectId, preRenderedHTMLNodes:[]}],
            items: [],
            preRenderedStyles: [],
        }).then((res) => {
            console.log("New project added");
            window.location.replace("/design/"+projectSlug);
            } 
        );
    }

    return (
        <form onSubmit={addNewProject} className="new-project-form">
            <input className="new-project-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add new project" />
            <button className="new-project-button w-button">New project</button>
        </form>
    )
}