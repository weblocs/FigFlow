import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePropertyInPreRenderedStyle } from "../../features/pre-rendered-html-nodes";
import {doesStylePropertyBelongToActiveStyle} from "../../utils/nodes-editing"

export default function ProprtyInputLabel ({text,property}) {

    const activeStyleObject = useSelector((state) => state.designerProjectState.activeStyleObject);
    const doesStylePropertyBelongToActiveClass = useSelector((state) => doesStylePropertyBelongToActiveStyle(activeStyleObject,property));
    const dispatch = useDispatch();

    return (
        <div 
        onClick={() => dispatch(deletePropertyInPreRenderedStyle(property))} 
        className={"style-title-box" + ((doesStylePropertyBelongToActiveClass) ? " active" : "")}>
            <div className="text">{text}</div>
        </div>
    )
}