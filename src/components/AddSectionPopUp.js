import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {setCopiedSectionNodes, addSectionToPreRenderedHTMLNodes, setactiveLayoutFolder, setProjectPopUp} from "../features/pre-rendered-html-nodes"
import RenderedNode from "./RenderedNode"

export default function AddSectionPopUp() {

    const projectLayouts = useSelector((state) => state.designerProjectState.projectLayouts)
    const activeLayoutFolder = useSelector((state) => state.designerProjectState.activeLayoutFolder)
    const projectMode = useSelector((state) => state.designerProjectState.projectMode)
    const projectPopUp = useSelector((state) => state.designerProjectState.projectPopUp)


    const addSectionPopUpOpened = useSelector((state) => {
        if(projectPopUp === "addSection") {
            return true
        }
        return false
    })
    const dispatch = useDispatch()

    const [presentedSectionNodes, setPresentedSectionNodes] = useState({type: "", children:[], class: []});
    

    function handleAddSectionClick() {
        if(presentedSectionNodes?.type === "sec") {
            dispatch(setCopiedSectionNodes(presentedSectionNodes));
            dispatch(addSectionToPreRenderedHTMLNodes());
            dispatch(setProjectPopUp(""));
        }
    }

    function handleShowSection(sectionNodes) {
        setPresentedSectionNodes(sectionNodes);
    }

    function handleClickInPopUpCloseArea () {
        dispatch(setProjectPopUp(""));
    }

    if(projectMode === "creator") {
        return (
            <div className={"add-section_popup-box" + ((addSectionPopUpOpened) ? " active" : "")}>
                <div 
                className="add-section_popup_close-area"
                onClick={handleClickInPopUpCloseArea}></div>
                <div className="add-section_popup-list-box">
                    <div className="add-section_popup-list">
                        
                        <div className="text-h2">Layouts</div>
                        <button 
                        className={"add-section_popup-button" + ((presentedSectionNodes?.type === "sec") ? " active" : "")} 
                        onClick={handleAddSectionClick}>Add layout</button>
                        
                        {projectLayouts.map((folder) => (
                            <div key={folder.id}>
                                <div 
                                onClick={() => dispatch(setactiveLayoutFolder(folder.id))}
                                className={"sections-nav-folder-item" + ((activeLayoutFolder === folder.id) ? " active" : "" )}
                                key={folder.id}>
                                    {folder.name}
                                </div>
                                {folder.items.map((section) => (
                                    <div className="projectPageItem" onClick={() => handleShowSection({...section.preRenderedHTMLNodes})} key={section.id}>
                                        {section.name}
                                    </div>
                                ))}
                            
                            </div>
                        ))}
                    </div>
                    <div className="present-section-in-popup">
                    
                        
                         <RenderedNode
                            data={presentedSectionNodes}
                            cmsCollectionId={presentedSectionNodes.cmsCollectionId}
                            cmsFieldId={presentedSectionNodes.cmsFieldId}
                            type={presentedSectionNodes.type}
                            id={presentedSectionNodes.id}
                            key={presentedSectionNodes.id}
                            title={presentedSectionNodes.title}
                            children={presentedSectionNodes.children}
                            class={presentedSectionNodes.class}
                        />
                    </div>
                </div>
            </div>
        )
    } 
}