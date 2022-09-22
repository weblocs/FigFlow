import React from "react";
import { useDispatch } from "react-redux";
import { addHtmlNode } from "../../../../features/project";



interface AddNodeButtonProps {
    text: string,
    type: "div" | "h" | "p" | "img" | "l" | "col" | "sec" | "sym" | "rich",
}

const AddNodeButton: React.FC<AddNodeButtonProps> = ({text, type}) => {
    const dispatch = useDispatch()
    return (
        <div 
        className="addNodeButton medium" 
        onClick={() => dispatch(addHtmlNode(type))}>
            {text}
        </div>
    )
}

export default AddNodeButton