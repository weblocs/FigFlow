import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux'
import {editStyleInPreRenderedStyles} from "../../features/pre-rendered-html-nodes"


export default function DisplayFlexChildSizingButton (props) {

    const activeStyleIndex = useSelector((state) => state.designerProjectState.activeStyleIndex)

    const styleFlexGrow = useSelector((state) => state.designerProjectState.preRenderedStyles[activeStyleIndex]?.styles ["flex-grow"])
    const styleFlexShrink = useSelector((state) => state.designerProjectState.preRenderedStyles[activeStyleIndex]?.styles ["flex-shrink"])

    const [activeSizing, setActiveSizing] = useState("");

    useEffect(() => {
        if(styleFlexGrow === "1") {
            setActiveSizing("grow");
        } else {
            if(styleFlexShrink === "1") {
                setActiveSizing("shrink");
            } else if(styleFlexShrink === "0") {
                setActiveSizing("dont");
            }
        }
    },[styleFlexGrow, styleFlexShrink]);
    

    const dispatch = useDispatch()

    
    function handleClick() {
        let flexGrow = "";
        let flexShrink = ""
        let flexBasis = "";

        if (props.value === "shrink") {
            flexGrow = "0"
            flexShrink = "1";
            flexBasis = "auto";
        } else if (props.value === "grow") {
            flexGrow = "1"
            flexShrink = "1";
            flexBasis = "0%";
        } else {
            flexGrow = "0"
            flexShrink = "0";
            flexBasis = "auto";
        }

        dispatch(editStyleInPreRenderedStyles(["flex-grow", flexGrow]))
        dispatch(editStyleInPreRenderedStyles(["flex-shrink", flexShrink]))
        dispatch(editStyleInPreRenderedStyles(["flex-basis", flexBasis]))
    }

    return (
        <div
            className={"display-button " + ((activeSizing === props.value) ? "active" : "")}
            onClick={handleClick}
          >
            <div className="text">{props.letter}</div>
          </div>
    )
}