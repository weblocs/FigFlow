import { useDispatch, useSelector } from "react-redux"
import { saveProjectToFirebase, setProjectMode } from "../../../features/project";

export default function ModeChanger() {
    const projectMode = useSelector((state) => state.project.projectMode);
    const projectModeButtonText = useSelector((state) => {
        if(state.project.projectMode === "developer") {
            return "Creator Mode"
        } else {
            return "Developer Mode"
        }
    });
    const dispatch = useDispatch();

    function handleClick() {
        dispatch(saveProjectToFirebase());
        dispatch(setProjectMode( ((projectMode === "developer") ? "creator" : "developer" ) ));
    }
   
    return (
        <div onClick={handleClick} className="logo-settings-panel-link">{projectModeButtonText}</div>
    )
}