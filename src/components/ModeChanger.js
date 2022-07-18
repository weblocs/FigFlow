import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { saveProjectToFirebase, setProjectMode } from "../features/pre-rendered-html-nodes";

export default function ProjectTopNavbar() {
    const projectMode = useSelector((state) => state.designerProjectState.projectMode);
    const projectModeLink = useSelector((state) => {
        if(state.designerProjectState.projectMode === "developer") {
            return "create"
        } else {
            return "design"
        }
    });
    const dispatch = useDispatch();
    let params = useParams();

    function handleClick() {
        dispatch(saveProjectToFirebase());
        dispatch(setProjectMode( ((projectMode === "developer") ? "creator" : "developer" ) ));
    }
   
    return (
        // <Link to={"/" + projectModeLink + "/" + params.projectSlug} onClick={() => dispatch(saveProjectToFirebase())}>
        //     <div className="addNodeButton">M</div>
        // </Link> 
        <div onClick={handleClick}>
            <div className="addNodeButton">M</div>
        </div>     
    )
}