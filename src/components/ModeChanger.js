import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function ProjectTopNavbar() {
    const projectModeLink = useSelector((state) => {
        if(state.designerProjectState.projectMode === "developer") {
            return "create"
        } else {
            return "design"
        }
    });
    let params = useParams();
   
    return (
        <Link to={"/" + projectModeLink + "/" + params.projectSlug}>
            <div className="addNodeButton left-margin">M</div>
        </Link>   
    )
}