import React from "react";
import { useDispatch } from "react-redux";
import { addHtmlNode } from "../../../../features/project";

const AddNodeButton = ({text, type}) => {
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