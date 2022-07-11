import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePropertyInPreRenderedStyle } from "../../features/pre-rendered-html-nodes";
import {doesStylePropertyBelongToActiveStyle} from "../../utils/nodes-editing"
import AlignStyleInputButton from "./AlignStyleInputButton";

export default function AlignStyleInput () {

    const activeStyleObject = useSelector((state) => state.designerProjectState.activeStyleObject);
    const doesStylePropertyBelongToActiveClass = useSelector((state) => doesStylePropertyBelongToActiveStyle(activeStyleObject,"text-align"));
    const dispatch = useDispatch();

    return (
          <div className="display-horizontal-grid">
              
            <div 
            onClick={() => dispatch(deletePropertyInPreRenderedStyle("text-align"))} 
            className={"style-title-box" + ((doesStylePropertyBelongToActiveClass) ? " active" : "")}>
              <div className="text">Align</div>
            </div>
            <div className="display-buttons-box">
              <AlignStyleInputButton letter="L" value="left" />
              <AlignStyleInputButton letter="C" value="center" />
              <AlignStyleInputButton letter="R" value="right" />
              <AlignStyleInputButton letter="J" value="justify" />
            </div>
          </div>
    )
}