import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux'
import { editStyleProperty } from "../../../../features/project";
import { deleteUnits } from "../../../../utils/style-panel";


export default function DisplayDirectionStyleButton (props) {

    const displayStyle = useSelector((state) => deleteUnits(state.project.activeStyleObject?.[props.style.replace("-","_")]) || deleteUnits(state.project.activeNodeComputedStyles?.[props.style.replace("-","_")]));
    const isStyleDirectionReversed = displayStyle?.includes("-reverse");
    
    const dispatch = useDispatch()

    const [reverse, setReverse] = useState("");

    function handleClick() {
        if(!isStyleDirectionReversed) {
            dispatch(editStyleProperty([props.style, displayStyle+"-reverse" ]));
        } else {
            dispatch(editStyleProperty([props.style, displayStyle.replace("-reverse","") ]));
        }
    }

    return (
        <div
            className={"display-button " + ((isStyleDirectionReversed) ? "active" : "")}
            onClick={handleClick}
            style={{width: "28px", marginLeft:"5px", borderLeft: "1px solid #d3d3d3", flexShrink: "0"}}
          >
            <div className="text">R</div>
          </div>
    )
}