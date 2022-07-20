import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateNewSection from "./CreateNewSection";
import CreateNewSectionFolder from "./CreateNewSectionFolder";

import {setactiveLayoutFolder, deleteSection, addSectionToPreRenderedHTMLNodes, setCopiedSectionNodes} from "../features/pre-rendered-html-nodes"

export default function ProjectLayoutsPanel () {
    const dispatch = useDispatch()
    const projectLayouts = useSelector((state) => state.designerProjectState.projectLayouts)
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)
    const activeLayoutFolder = useSelector((state) => state.designerProjectState.activeLayoutFolder)


    function handleClickInSymbolItem(sectionNodes) {
        dispatch(setCopiedSectionNodes(sectionNodes));
        dispatch(addSectionToPreRenderedHTMLNodes());
    }
    
    return(
        <div className={"projectPagesPanel "+ ((activeProjectTab === "Layouts") ? "active" : "" )}>
            
            <div className="projectTabTitleBox">Layouts</div>

            <CreateNewSectionFolder />
            <CreateNewSection />

            <div className="pagesList">
            
            {projectLayouts.map((folder) => (
                <div key={folder.id}>
                    <div 
                    onClick={() => dispatch(setactiveLayoutFolder(folder.id))}
                    className={"sections-nav-folder-item" + ((activeLayoutFolder === folder.id) ? " active" : "" )}
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
                </div>
            ))}
            </div>
        </div>
    )
}