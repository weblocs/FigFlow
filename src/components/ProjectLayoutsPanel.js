import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {createNewSectionFolder} from "../features/pre-rendered-html-nodes"
import CreateNewItemInput from "./CreateNewItemInput";
import ListItemEditIcon from "./ListItemEditIcon";
import CreateLayoutButton from "./CreateLayoutButton";
import ProjectLayoutListFolder from "./ProjectLayoutListFolder";

export default function ProjectLayoutsPanel () {
    const dispatch = useDispatch()
    const projectLayouts = useSelector((state) => state.designerProjectState.projectLayouts)
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)

    const [createPageInputVisible, setCreatePageInputVisible] = useState(false);
    const [createFolderInputVisible, setCreateFolderInputVisible] = useState(false);
    
    return(
        <div className={"projectPagesPanel "+ ((activeProjectTab === "Layouts") ? "active" : "" )}>

            <div className="projectTabTitleBox">
                Layouts
                <div className="projectTabTitleButtonsBox">
                    {/* <button onClick={() => setCreatePageInputVisible(!createPageInputVisible)}>L</button> */}
                    <button onClick={() => setCreateFolderInputVisible(!createFolderInputVisible)}>F</button>
                </div>
            </div>

            <CreateNewItemInput 
            visibility={createFolderInputVisible} 
            create={createNewSectionFolder} 
            placeholder="New folder" />

            <div className="pagesList">
            
            {projectLayouts.map((folder) => (
                <ProjectLayoutListFolder folder={folder} key={folder.id} />    
            ))}
            </div>
        </div>
    )
}