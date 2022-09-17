import React from "react";
import { useDispatch } from "react-redux";
import { addNodeToRenderedHTMLNodesAfterActiveNode } from "../../../../features/pre-rendered-html-nodes";



interface AddNodeButtonProps {
    text: string,
    type: "div" | "h" | "p" | "img" | "l" | "col" | "sec" | "sym" | "rich",
}

const AddNodeButton: React.FC<AddNodeButtonProps> = ({text, type}) => {
    const dispatch = useDispatch()
    return (
        <div 
        className="addNodeButton medium" 
        onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode(type))}>
            {text}
        </div>
    )
}

export default AddNodeButton