import { useDispatch, useSelector } from "react-redux"
import {setActiveNodeAndStyle,setAddSectionPopUpOpened} from "../features/pre-rendered-html-nodes"

export default function AddSectionButton({sectionId}) {

    const projectMode = useSelector((state) => state.designerProjectState.projectMode)
    const dispatch = useDispatch()

    function handleAddSectionButtonClick () {
        // dispatch(setActiveNodeAndStyle({id:sectionId}));
        dispatch(setAddSectionPopUpOpened(true));
    }

    if(projectMode === "creator") {
        return (
            <div className="add-section_box">
                <div className="add-section_button" 
                onClick={handleAddSectionButtonClick}>Add section</div>
            </div>
        )
    } 
}

