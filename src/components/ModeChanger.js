import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { saveProjectToFirebase } from "../features/pre-rendered-html-nodes";

export default function ProjectTopNavbar() {
    const projectModeLink = useSelector((state) => {
        if(state.designerProjectState.projectMode === "developer") {
            return "create"
        } else {
            return "design"
        }
    });
    const dispatch = useDispatch();
    let params = useParams();
   
    return (
        <Link to={"/" + projectModeLink + "/" + params.projectSlug} onClick={() => dispatch(saveProjectToFirebase())}>
            <div className="addNodeButton">M</div>
        </Link>   
    )
}