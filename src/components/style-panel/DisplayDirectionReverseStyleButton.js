import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux'
import {editStyleInPreRenderedStyles} from "../../features/pre-rendered-html-nodes"


export default function DisplayDirectionStyleButton () {

    const activeStyleIndex = useSelector((state) => state.designerProjectState.activeStyleIndex)
    const displayStyle = useSelector((state) => state.designerProjectState.preRenderedStyles[activeStyleIndex]?.styles ["flex-direction"])
    const isStyleDirectionReversed = displayStyle?.includes("-reverse");
    
    const dispatch = useDispatch()

    const [reverse, setReverse] = useState("");

    function handleClick() {
        if(!isStyleDirectionReversed) {
            dispatch(editStyleInPreRenderedStyles(["flex-direction", displayStyle+"-reverse" ]));
        } else {
            dispatch(editStyleInPreRenderedStyles(["flex-direction", displayStyle.replace("-reverse","") ]));
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