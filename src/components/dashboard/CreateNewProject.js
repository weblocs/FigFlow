import React, {useEffect, useState} from "react";
import { v4 as uuidv4 } from "uuid";

import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, setDoc, doc, where,query, collection, getDoc } from "firebase/firestore";
import { firebaseConfig } from "../../utils/firebase-config";

export default function CreateNewProject (props) {
    const [input, setInput] = useState("");
    const [templates, setTemplates] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalStep, setModalStep] = useState(0);
    const newProjectId = uuidv4();
    const firstPageInProjectId = uuidv4();
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const [templateData, setTemplateData] = useState({
        pages: [{name: "Home", id: firstPageInProjectId, preRenderedHTMLNodes:[]}],
        projectPageFolderStructure: [{name: "Home", id: firstPageInProjectId}],
        projectPageFolders: [],
        collections: [],
        setStyles: [],
        symbols: [],
        swatches: [],
        sections: [],
        richTextElements: [],
        images: [],
        preRenderedStyles: [],
    });


    async function getTemplates () {
        const querySnapshot = await getDocs(query(collection(db, "templates")));
        let tempTemplates = [];
        querySnapshot.forEach((doc) => {
            tempTemplates = [...tempTemplates, doc.data()];
        });
        setTemplates(tempTemplates);
    }

    useEffect(() => {
        getTemplates();
    },[])

    async function addNewProject(e) {
        e.preventDefault();

        if(input !== "") {
            let projectSlug = input.toLowerCase().replaceAll(" ","-");
            let sameNameProjects = await getDocs( query( collection(db, "projects"), where("projectId", "==", projectSlug)));
            
            // check if in database we don't have same slug
            let projectSufixIndex = 1;
            let initialProjectSlug = projectSlug;
            while(sameNameProjects.size > 0) {
                projectSufixIndex++;
                projectSlug = initialProjectSlug + '-'+projectSufixIndex;
                sameNameProjects = await getDocs(query( collection(db, "projects"), where("projectId", "==", projectSlug)));
            } 
            
            await setDoc(doc(collection(db, "projects"), newProjectId), {
                projectId: projectSlug,
                projectName: input,
                userid: props.userid,
                pages: templateData.pages,
                projectPageFolderStructure: templateData.projectPageFolderStructure,
                projectPageFolders: templateData.projectPageFolders,
                collections: templateData.collections,
                setStyles: templateData.setStyles,
                symbols: templateData.symbols,
                swatches: templateData.swatches,
                sections: templateData.sections,
                richTextElements: templateData.richTextElements,
                images: templateData.images,
                preRenderedStyles: templateData.preRenderedStyles,

            }).then((res) => {
                window.location.replace("/design/"+projectSlug);
                } 
            );
        }
    }

    async function handleTemplateClick (id) {
        if(id !== "") {
            const tempTemplateData = await (await getDoc(doc(db, "projects", id))).data();
            setTemplateData({
                pages: tempTemplateData.pages,
                projectPageFolderStructure: tempTemplateData.projectPageFolderStructure,
                projectPageFolders: tempTemplateData.projectPageFolders,
                collections: tempTemplateData.collections,
                setStyles: tempTemplateData.setStyles,
                symbols: tempTemplateData.symbols,
                swatches: tempTemplateData.swatches,
                sections: tempTemplateData.sections,
                richTextElements: tempTemplateData.richTextElements,
                images: tempTemplateData.images,
                preRenderedStyles: tempTemplateData.preRenderedStyles,
            })
        }
        setModalStep(1);
    }

    return (
        <div>
            <div 
            onClick={() => setIsModalOpen(true)}
            className="new-project-button w-button">
                New project
            </div>
            <div className={"new-project_modal" + (isModalOpen ? " active" : "") }>
                <div 
                onClick={() => setIsModalOpen(false)}
                className="new-project_modal-close-area"></div>
                <div className="new-project_modal-content-area">

                    <form onSubmit={addNewProject} 
                    className={"new-project-form" + ((modalStep === 1) ? " active" : "") }>
                        <div onClick={() => setModalStep(0)} className="dashboard-modal_back-button">Back</div>
                        <input className="new-project-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Project name" />
                        <button className="new-project-button w-button">Create project</button>
                    </form>

                    <div className={"project-template_grid" + ((modalStep === 0) ? " active" : "") }>
                        <div
                        onClick={() => handleTemplateClick("")}
                        className="project-template_item">
                            Blank Project
                            <span>Start from scratch</span>
                        </div>
                        {templates.map((template) => {
                            return (
                            <div 
                            onClick={() => handleTemplateClick(template.projectId)}
                            className="project-template_item">
                                {template.name}
                                <span>Start from template</span>
                            </div>)
                        })}
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
}