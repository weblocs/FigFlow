import { useDispatch, useSelector } from "react-redux"
import {setActiveNodeAndStyle, setProjectPopUp} from "../features/pre-rendered-html-nodes"

export default function AddSectionButton({sectionId}) {

    const projectMode = useSelector((state) => state.designerProjectState.projectMode)
    const hoveredSectionId = useSelector((state) => state.designerProjectState.hoveredSectionId)
    const dispatch = useDispatch()

    function handleAddSectionButtonClick () {
        dispatch(setActiveNodeAndStyle({id:sectionId}));
        dispatch(setProjectPopUp("addSection"));
    }

    if(projectMode === "creator") {
        return (
            <div className={"add-section_box" + ((hoveredSectionId === sectionId) ? " active" : "")}>
                <div className="add-section_button" 
                onClick={handleAddSectionButtonClick}>+</div>
            </div>
        )
    } 
}

