import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { saveProjectToFirebase, setProjectMode } from "../features/pre-rendered-html-nodes";

import ProIcon from '../img/pro.svg';

export default function ModeChanger() {
    const projectMode = useSelector((state) => state.designerProjectState.projectMode);
    const projectModeButtonText = useSelector((state) => {
        if(state.designerProjectState.projectMode === "developer") {
            return "Creator Mode"
        } else {
            return "Developer Mode"
        }
    });
    const dispatch = useDispatch();
    let params = useParams();

    function handleClick() {
        dispatch(saveProjectToFirebase());
        dispatch(setProjectMode( ((projectMode === "developer") ? "creator" : "developer" ) ));
    }
   
    return (
        <div onClick={handleClick} className="logo-settings-panel-link">{projectModeButtonText}</div>
        // <div onClick={handleClick}>
        //     <div className="addNodeButton">
        //         M
        //     </div>
        // </div>     
    )
}