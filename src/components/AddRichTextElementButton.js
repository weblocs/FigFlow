import { useDispatch, useSelector } from "react-redux"
import {setActiveNodeAndStyle, setProjectPopUp} from "../features/pre-rendered-html-nodes"

export default function AddRichTextElementButton({elementId}) {

    const projectMode = useSelector((state) => state.designerProjectState.projectMode)
    const hoveredSectionId = useSelector((state) => state.designerProjectState.hoveredSectionId)
    const dispatch = useDispatch()

    function handleAddSectionButtonClick (e) {
        dispatch(setActiveNodeAndStyle({id:elementId}));
        console.log(elementId);
        dispatch(setProjectPopUp("addElement"));
    }

    if(projectMode === "creator") {
        return (
            <div className={"add-section_box active " + elementId}>
                <div className="add-section_button"
                onClick={handleAddSectionButtonClick}>+</div>
            </div>
        )
    } 
}

