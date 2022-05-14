import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import FigFlow from "../FigFlow";

export default function Design() {
    let params = useParams();

  return (
    <div>
      <FigFlow projectSlug={params.projectSlug} />
    </div>
  );
}
