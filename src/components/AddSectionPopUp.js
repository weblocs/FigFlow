import { useDispatch, useSelector } from "react-redux"
import {setCopiedSectionNodes, addSectionToPreRenderedHTMLNodes, setActiveSectionFolder, setProjectPopUp} from "../features/pre-rendered-html-nodes"

export default function AddSectionPopUp() {

    const projectSections = useSelector((state) => state.designerProjectState.projectSections)
    const activeSectionFolder = useSelector((state) => state.designerProjectState.activeSectionFolder)
    const projectMode = useSelector((state) => state.designerProjectState.projectMode)
    const addSectionPopUpOpened = useSelector((state) => {
        if(state.designerProjectState.projectPopUp === "addSection") {
            return true
        }
        return false
    })
    const dispatch = useDispatch()
    

    function handleAddSectionClick(sectionNodes) {
        dispatch(setCopiedSectionNodes(sectionNodes));
        dispatch(addSectionToPreRenderedHTMLNodes());
        dispatch(setProjectPopUp(""));
    }

    function handleClickInPopUpCloseArea () {
        dispatch(setProjectPopUp(""));
    }

    if(projectMode === "creator") {
        return (
            <div className={"add-section_popup-box" + ((addSectionPopUpOpened) ? " active" : "")}>
                <div className="add-section_popup_close-area" onClick={handleClickInPopUpCloseArea}></div>
                <div className="add-section_popup-list">
                    <div className="text-h2">Add section</div>
                    {projectSections.map((folder) => (
                        <div key={folder.id}>
                            <div 
                            onClick={() => dispatch(setActiveSectionFolder(folder.id))}
                            className={"sections-nav-folder-item" + ((activeSectionFolder === folder.id) ? " active" : "" )}
                            key={folder.id}>
                                {folder.name}
                            </div>
                            {folder.items.map((section) => (
                                <div className="projectPageItem" onClick={() => handleAddSectionClick({...section.preRenderedHTMLNodes})} key={section.id}>{section.name}</div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        )
    } 
}