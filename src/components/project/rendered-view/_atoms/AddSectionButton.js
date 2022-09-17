import { useDispatch, useSelector } from "react-redux"
import {setActiveNodeId, setProjectPopUp} from "../../../../features/pre-rendered-html-nodes"

export default function AddSectionButton({sectionId}) {

    const nodesEditMode = useSelector((state) => state.designerProjectState.nodesEditMode)
    const hoveredSectionId = useSelector((state) => state.designerProjectState.hoveredSectionId)
    const dispatch = useDispatch()

    function handleAddSectionButtonClick () {
        dispatch(setActiveNodeId({id:sectionId}));
        dispatch(setProjectPopUp("addSection"));
    }

    if(nodesEditMode !== "layout") {
        return (
            <div className={"add-section_box active" + ((hoveredSectionId === sectionId) ? " active" : "")}>
                <div className="add-section_button" 
                onClick={handleAddSectionButtonClick}>+</div>
            </div>
        )
    } 
}

