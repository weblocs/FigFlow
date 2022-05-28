import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";

import {setHoveredNodeId, setActiveNodeAndStyle} from "../features/pre-rendered-html-nodes"

 function NavigationNodeItem ({node, depth}) {
     const dispatch = useDispatch()
    const hoveredNodeId = useSelector((state) => state.designerProjectState.hoveredNodeId)
    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId)

    return (
        <div className={"navigation-node " + ((node.id == activeNodeId) ? "active " : " ") + ((node.id == hoveredNodeId) ? "hovered " : " ")}
            style={{paddingLeft: depth + "0px"}}
            onMouseOver={() => dispatch(setHoveredNodeId(node.id))}
            onMouseOut={() => dispatch(setHoveredNodeId(""))}
            onClick={() => dispatch(setActiveNodeAndStyle({id: node.id}))}
        >
            <div className={"navigation-node-inside" + ((depth > 0) ? " lined" : "")}>
                {node.type} - {(node?.symbolId === undefined) ? ((node?.class[0]?.name !== undefined) ? node?.class[0]?.name : node?.type) : (projectSymbols.find( ({id}) => id === node.symbolId)?.name )}
            </div>
        </div>
    )
}

export default NavigationNodeItem;
 