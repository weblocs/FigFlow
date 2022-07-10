import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateNewSection from "./CreateNewSection";
import CreateNewSectionFolder from "./CreateNewSectionFolder";

import {setActiveSectionFolder, deleteSection, addSectionToPreRenderedHTMLNodes, setCopiedSectionNodes} from "../features/pre-rendered-html-nodes"

export default function ProjectPagesPanel () {
    const dispatch = useDispatch()
    const projectSections = useSelector((state) => state.designerProjectState.projectSections)
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)
    const activeSectionFolder = useSelector((state) => state.designerProjectState.activeSectionFolder)


    function handleClickInSymbolItem(sectionNodes) {
        dispatch(setCopiedSectionNodes(sectionNodes));
        dispatch(addSectionToPreRenderedHTMLNodes());
    }
    
    return(
        <div className={"projectPagesPanel "+ ((activeProjectTab === "Sections") ? "active" : "" )}>
            
            <div className="projectTabTitleBox">Sections</div>

            <CreateNewSectionFolder />
            <CreateNewSection />

            <div className="pagesList">
            
            {projectSections.map((folder) => (
                <>
                    <div 
                    onClick={() => dispatch(setActiveSectionFolder(folder.id))}
                    className={"sections-nav-folder-item" + ((activeSectionFolder === folder.id) ? " active" : "" )}
                    key={folder.id}>
                        {folder.name}
                    </div>
                    {folder.items.map((section) => {
                        return (
                        <div className="projectPageItem" onClick={() => handleClickInSymbolItem({...section.preRenderedHTMLNodes})} key={section.id}>
                            {section.name}
                            <div className={"delete-section-item"} onClick={() => dispatch(deleteSection({id: section.id}))}>x</div>
                        </div>
                    )})}
                </>
            ))}
            </div>
        </div>
    )
}