import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteInlineNodeStyleProperty, deletePropertyInPreRenderedStyle } from "../../features/pre-rendered-html-nodes";
import {doesStylePropertyBelongToActiveStyle, doesStylePropertyIsInlineFx} from "../../utils/nodes-editing"

export default function ProprtyInputLabel ({text,property}) {

    const activeStyleObject = useSelector((state) => state.designerProjectState.activeStyleObject);
    const activeNodeObject = useSelector((state) => state.designerProjectState.activeNodeObject);
    const doesStylePropertyBelongToActiveClass = useSelector((state) => 
        doesStylePropertyBelongToActiveStyle(activeStyleObject,property)
    );
    const doesStylePropertyIsInline = useSelector((state) => 
        doesStylePropertyIsInlineFx(activeNodeObject,property)
    );
    const dispatch = useDispatch();

    function handleClick() {
        if(doesStylePropertyIsInline) {
            dispatch(deleteInlineNodeStyleProperty(property))
        } else if(doesStylePropertyBelongToActiveClass) {
            dispatch(deletePropertyInPreRenderedStyle(property));
        }  
    }

    return (
        <div 
        onClick={handleClick}
        className={"style-title-box" + 
        ((doesStylePropertyBelongToActiveClass) ? " active" : "") +
        ((doesStylePropertyIsInline) ? " isInline" : "")}
        >
            <div className="text">{text}</div>
        </div>
    )
}