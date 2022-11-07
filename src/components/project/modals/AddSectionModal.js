import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {copyLayoutHtmlNodes, pasteLayoutHtmlNodes, setProjectPopUp} from "../../../features/project"
import RenderedNode from "../rendered-view/RenderedNode"

export default function AddSectionModal() {

    const projectLayouts = useSelector((state) => state.project.projectLayouts)
    const projectPopUp = useSelector((state) => state.project.projectPopUp)

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
            dispatch(setProjectPopUp(""));
            dispatch(copyLayoutHtmlNodes(presentedSectionNodes));
            setTimeout(() => {
                dispatch(pasteLayoutHtmlNodes());
            }, 300);
        }
    }

    function handleShowSection(sectionNodes) {
        setPresentedSectionNodes(sectionNodes);
    }

    function handleClickInPopUpCloseArea () {
        dispatch(setProjectPopUp(""));
    }

    function handleNodeClick() {

    }

    if(addSectionPopUpOpened) {
    return (
        <div className="add-section_popup-box active">
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
                            className={"sections-nav-folder-item"}
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
                        onClick={handleNodeClick}
                    />
                </div>
            </div>
        </div>
    )
    }
}