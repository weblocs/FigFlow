import { useDispatch, useSelector } from "react-redux"
import {setActiveNodeAndStyle, setProjectPopUp} from "../features/pre-rendered-html-nodes"

export default function AddRichTextElementButton({elementId, nodes}) {

    const projectMode = useSelector((state) => state.designerProjectState.projectMode)

    const dispatch = useDispatch()

    function handleAddSectionButtonClick (e) {
        dispatch(setActiveNodeAndStyle({id:elementId}));
        dispatch(setProjectPopUp("addElement"));
    }

    if(projectMode === "creator") {
        return (
            <div className={"add-section_box " + ((nodes.children.length === 0) ? " active" : "") }>
                <div className="add-section_button"
                onClick={handleAddSectionButtonClick}>+</div>
            </div>
        )
    } 
}

