import React from "react";

import { useDispatch, useSelector } from 'react-redux'
import {editStyleInPreRenderedStyles} from "../../features/pre-rendered-html-nodes"


export default function DisplayStyleButton (props) {

    const activeStyleIndex = useSelector((state) => state.designerProjectState.activeStyleIndex)
    const displayStyle = useSelector((state) => state.designerProjectState.preRenderedStyles[activeStyleIndex]?.styles [props.style])

    const dispatch = useDispatch()

    return (
        <div
            className={"display-button " + ((displayStyle === props.value) ? "active" : "")}
            onClick={() => dispatch(editStyleInPreRenderedStyles([props.style, props.value]))}
          >
            <div className="text">{props.letter}</div>
          </div>
    )
}