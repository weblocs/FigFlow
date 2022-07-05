import { useSelector } from "react-redux";
import { addNodeToRenderedHTMLNodesAfterActiveNode } from "../features/pre-rendered-html-nodes";

export default function AddNodeButtonList() {

    const projectMode = useSelector((state) => state.designerProjectState.projectMode)

    if (projectMode === "developer") {
        return (
            <>
              <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("div"))}>D</div>
              <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("h"))}>H</div>
              <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("p"))}>P</div> 
              <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("col"))}>C</div>
              <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("img"))}>I</div>
              <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("l"))}>L</div> 
              <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("sym"))}>Sy</div>
              <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("sec"))}>Se</div>
              <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("rich"))}>R</div>
            </>
        )
    }
}