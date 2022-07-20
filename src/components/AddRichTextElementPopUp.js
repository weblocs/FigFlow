import { useDispatch, useSelector } from "react-redux"
import {setCopiedSectionNodes, addSectionToPreRenderedHTMLNodes, setactiveLayoutFolder, setProjectPopUp} from "../features/pre-rendered-html-nodes"

export default function AddRichTextElementPopUp() {

    const projectRichTextElements = useSelector((state) => state.designerProjectState.projectRichTextElements)
    const projectMode = useSelector((state) => state.designerProjectState.projectMode)
    const addSectionPopUpOpened = useSelector((state) => {
        if(state.designerProjectState.projectPopUp === "addElement") {
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
                <div className="add-section_popup-list-box">
                    <div className="add-section_popup-list">
                    <div className="text-h2">Add element</div>

                    {projectRichTextElements.map((element) => (
                        <div className="projectPageItem" onClick={() => handleAddSectionClick({...element.preRenderedHTMLNodes})} key={element.id}>{element.name}</div>
                    ))}
                    </div>
                </div>
            </div>
        )
    } 
}