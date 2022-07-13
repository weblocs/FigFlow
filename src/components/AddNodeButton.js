import { useDispatch } from "react-redux";
import { addNodeToRenderedHTMLNodesAfterActiveNode } from "../features/pre-rendered-html-nodes";

export default function AddNodeButton({text, type}) {
    const dispatch = useDispatch()
    return (
        <div className="addNodeButton large" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode(type))}>{text}</div>
    )
}