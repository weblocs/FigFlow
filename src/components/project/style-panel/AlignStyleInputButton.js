import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editStyleProperty } from "../../../features/project";

export default function AlignStyleInputButton ({letter, value}) {

    const activeStyleValue = useSelector((state) => state.project.activeStyleObject?.text_align || state.project.activeNodeComputedStyles?.text_align);
    const dispatch = useDispatch()

    function handleClick() {
        dispatch(editStyleProperty(["text-align", value]));
      }

    return (
        <div className={"display-button " + ((activeStyleValue === value) ? "active" : "")} onClick={handleClick}>
            <div className="text">{letter}</div>
        </div>
    )
}