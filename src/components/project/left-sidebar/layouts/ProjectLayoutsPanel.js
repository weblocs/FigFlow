import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addLayoutFolder} from "../../../../features/project"
import CreateNewItemInput from "../navigator/CreateNewItemInput";
import ListItemEditIcon from "../_atoms/ListItemEditIcon";
import CreateLayoutButton from "./CreateLayoutButton";
import ProjectLayoutListFolder from "./ProjectLayoutListFolder";
import AddButton from "../_atoms/AddButton";

export default function ProjectLayoutsPanel () {
    const dispatch = useDispatch()
    const projectLayouts = useSelector((state) => state.project.projectLayouts)
    const activeTab = useSelector((state) => state.project.activeTab)

    const [createPageInputVisible, setCreatePageInputVisible] = useState(false);
    const [createFolderInputVisible, setCreateFolderInputVisible] = useState(false);
    
    return(
        <div className={"projectPagesPanel "+ ((activeTab === "Layouts") ? "active" : "" )}>

            <div className="projectTabTitleBox">
                Layouts
                <div className="projectTabTitleButtonsBox">
                    {/* <button onClick={() => setCreatePageInputVisible(!createPageInputVisible)}>L</button> */}
                    <AddButton fx={() => setCreateFolderInputVisible(!createFolderInputVisible)} />
                </div>
            </div>

            <CreateNewItemInput 
            visibility={createFolderInputVisible} 
            create={addLayoutFolder} 
            placeholder="New folder" />

            <div className="pagesList">
            
            {projectLayouts.map((folder) => (
                <ProjectLayoutListFolder folder={folder} key={folder.id} />    
            ))}
            </div>
        </div>
    )
}