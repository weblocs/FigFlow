import React, {useState, useEffect} from "react";


import { useDispatch, useSelector } from 'react-redux'
import {editStyleInPreRenderedStyles} from "../../features/pre-rendered-html-nodes"
import ProjectStylePanelNew from "../ProjectStylePanelNew";


export default function DisplayStyleButton (props) {

    const activeStyleIndex = useSelector((state) => state.designerProjectState.activeStyleIndex)
    const displayStyle = useSelector((state) => state.designerProjectState.preRenderedStyles[activeStyleIndex]?.styles ["display"])

    const dispatch = useDispatch()

    return (
        <div className="display-button" 
            className={"display-button " + ((displayStyle === props.value) ? "active" : "")}
            onClick={() => dispatch(editStyleInPreRenderedStyles(["display", props.value]))}
          >
            <div className="text">{props.letter}</div>
          </div>
    )
}