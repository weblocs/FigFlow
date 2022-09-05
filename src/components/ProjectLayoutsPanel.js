import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateNewSection from "./CreateNewSection";
import CreateNewSectionFolder from "./CreateNewSectionFolder";

import {editLayout, editLayoutFolder, deleteLayoutFolder, setactiveLayoutFolder, deleteLayout, setActiveLayout, createNewSection, createNewSectionFolder} from "../features/pre-rendered-html-nodes"
import CreateNewItemInput from "./CreateNewItemInput";
import ListItemEditIcon from "./ListItemEditIcon";

export default function ProjectLayoutsPanel () {
    const dispatch = useDispatch()
    const projectLayouts = useSelector((state) => state.designerProjectState.projectLayouts)
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)
    const activeLayoutFolder = useSelector((state) => state.designerProjectState.activeLayoutFolder)
    const activeLayoutId = useSelector((state) => state.designerProjectState.activeLayoutId)


    const [createPageInputVisible, setCreatePageInputVisible] = useState(false);
    const [createFolderInputVisible, setCreateFolderInputVisible] = useState(false);

    function handleClickInSymbolItem(id, folderId) {
        dispatch(setActiveLayout({id:id, folderId: folderId}));
    }
    
    return(
        <div className={"projectPagesPanel "+ ((activeProjectTab === "Layouts") ? "active" : "" )}>

            <div className="projectTabTitleBox">
                Layouts
                <div className="projectTabTitleButtonsBox">
                    <button onClick={() => setCreatePageInputVisible(!createPageInputVisible)}>L</button>
                    <button onClick={() => setCreateFolderInputVisible(!createFolderInputVisible)}>F</button>
                </div>
            </div>
            
            <CreateNewItemInput 
            visibility={createPageInputVisible} 
            create={createNewSection} 
            placeholder="New layout" />

            <CreateNewItemInput 
            visibility={createFolderInputVisible} 
            create={createNewSectionFolder} 
            placeholder="New folder" />

            <div className="pagesList">
            
            {projectLayouts.map((folder) => (
                <div key={folder.id} 
                className="edit-icon_wrap-folder">
                    <div 
                    onClick={() => dispatch(setactiveLayoutFolder(folder.id))}
                    className={"sections-nav-folder-item" + ((activeLayoutFolder === folder.id) ? " active" : "" )}
                    key={folder.id}>
                        {folder.name}
                    </div>

                        <ListItemEditIcon 
                            text="Edit Layout Folder"
                            itemType="layout folder"
                            element={folder}
                            editFx={editLayoutFolder} 
                            deleteFx={deleteLayoutFolder} 
                            folderItem={true}
                            active={false}
                            isDeleteButtonVisible={true} />

                    {folder.items.map((section) => {
                        return (
                        <div style={{position:"relative"}}
                        key={section.id}
                        className="edit-icon_wrapper"
                        >
                            <div 
                            className={"projectPageItem block-item" + ((activeLayoutId === section.id) ? " active" : "" )} 
                            onClick={() => handleClickInSymbolItem(section.id, folder.id)}>
                                {section.name} 
                            </div>
                        
                        

                        <ListItemEditIcon 
                            text="Edit Layout"
                            itemType="layout"
                            element={section}
                            editFx={editLayout} 
                            deleteFx={deleteLayout} 
                            active={false}
                            isDeleteButtonVisible={true} />
                        </div>
                    )})}
                </div>
            ))}
            </div>
        </div>
    )
}