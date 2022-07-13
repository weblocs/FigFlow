import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";

import {setHoveredNodeId, setActiveNodeAndStyle} from "../features/pre-rendered-html-nodes"

 function NavigationNodeItem ({node, depth}) {
    const dispatch = useDispatch()
    const hoveredNodeId = useSelector((state) => state.designerProjectState.hoveredNodeId)
    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId)
    const projectSymbols = useSelector((state) => state.designerProjectState.projectSymbols)

    const nodeName = (node?.symbolId === undefined) ? ((node?.class[0]?.name !== undefined) ? node?.class[0]?.name : node?.type) : (projectSymbols.find( ({id}) => id === node.symbolId)?.name );

    return (
        <div className={"navigation-node " + ((node.id == activeNodeId) ? "active " : " ") + ((node.id == hoveredNodeId) ? "hovered " : " ")}
            style={{paddingLeft: depth*8 + "px"}}
            onMouseOver={() => dispatch(setHoveredNodeId(node.id))}
            onMouseOut={() => dispatch(setHoveredNodeId(""))}
            onClick={() => dispatch(setActiveNodeAndStyle({id: node.id}))}
            nodeid={node.id}
            nodename={nodeName}
        >
            <div className={"navigation-node-inside" + ((depth > 0) ? " lined" : "")}>
                <span>{node.type}</span>{nodeName}
            </div>
        </div>
    )
}

export default NavigationNodeItem;
 