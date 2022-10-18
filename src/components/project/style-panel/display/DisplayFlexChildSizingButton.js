import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux'
import { editStyleProperty } from "../../../../features/project";


export default function DisplayFlexChildSizingButton (props) {

    const styleFlexGrow = useSelector((state) => state.project.activeNodeComputedStyles?.["flex_grow"])
    const styleFlexShrink = useSelector((state) => state.project.activeNodeComputedStyles?.["flex_shrink"])

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

        dispatch(editStyleProperty(["flex-grow", flexGrow]))
        dispatch(editStyleProperty(["flex-shrink", flexShrink]))
        dispatch(editStyleProperty(["flex-basis", flexBasis]))
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