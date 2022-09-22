import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editStyleProperty } from "../../../features/project";

export default function AlignStyleInputButton ({letter, value}) {

    const activeNodeId = useSelector((state) => state.project.activeNodeId);
    const activeStyleValue = useSelector((state) => {
        if(activeNodeId !== "") {
            try {
                const activeNode = document.querySelector(`[el_id="${activeNodeId}"]`);
                return getComputedStyle(activeNode)?.["text-align"];
            } catch {
            }
        }
    });
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