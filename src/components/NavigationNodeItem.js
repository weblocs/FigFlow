import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";

import {setHoveredNodeId, setActiveNodeAndStyle, setDragableCopiedNodes, setDraggedOverNodeId, pasteDraggedNodes, setDraggedBefore} from "../features/pre-rendered-html-nodes"

 function NavigationNodeItem ({parents, node, depth}) {
    const dispatch = useDispatch()
    const hoveredNodeId = useSelector((state) => state.designerProjectState.hoveredNodeId)
    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId)
    const projectSymbols = useSelector((state) => state.designerProjectState.projectSymbols)
    const dragableCopiedNodes = useSelector((state) => state.designerProjectState.dragableCopiedNodes)
    const draggedOverNodeId = useSelector((state) => state.designerProjectState.draggedOverNodeId)
    const draggedBefore = useSelector((state) => (state.designerProjectState.draggedBefore) ? true : false)

    const nodeName = (node?.symbolId === undefined) ? ((node?.class[0]?.name !== undefined) ? node?.class[0]?.name : node?.type) : (projectSymbols.find( ({id}) => id === node.symbolId)?.name );

    const [mouseIsOver, setMouseIsOver] = useState(false);

    function handleClick (id) {
        dispatch(setActiveNodeAndStyle({id: id}));
    }

    function handleDragStart (id) {
        dispatch(setDragableCopiedNodes(id));
    }

    function handleDragOver (id) {
        event.preventDefault();

        let parentIsNotDraggedNode = true;
        parents.forEach((parent) => {
            if(parent.id === dragableCopiedNodes.id) {
                parentIsNotDraggedNode = false;
            }
        })
        
        if(node.id !== dragableCopiedNodes.id && parentIsNotDraggedNode) {
            if (event.clientY - document.querySelector(`[nodeid="${node.id}"]`).offsetTop < 10 ) {
                if(!draggedBefore) {
                    dispatch(setDraggedBefore(true));
                }
            } else {
                if(draggedBefore) {
                    dispatch(setDraggedBefore(false));
                }
            }
            if(id !== draggedOverNodeId) {
                dispatch(setDraggedOverNodeId(id));
            }
        } else {
            dispatch(setDraggedOverNodeId(""));
        }
        
    }

    function handleDrop (id) {
        if(!mouseIsOver) {
            dispatch(pasteDraggedNodes());
        } else {
            dispatch(setDraggedOverNodeId(""));
        }
    }

    return ( 
        <div className={"navigation-node " + ((draggedBefore) ? "dragged-before " : "") + ((node.id === draggedOverNodeId) ? "dragged-over " : " ") + ((node.id == activeNodeId) ? "active " : " ") + ((node.id == hoveredNodeId) ? "hovered " : " ")}
            style={{paddingLeft: depth*8 + "px"}}
            onMouseOver={() => dispatch(setHoveredNodeId(node.id))}
            onMouseOut={() => dispatch(setHoveredNodeId(""))}
            onClick={() => handleClick(node.id)}
            onDoubleClick={() => handleDoubleClick(node.id)}
            draggable="true"
            onDragStart={() => handleDragStart(node.id)}
            onDragOver={() => handleDragOver(node.id)}
            onMouseLeave={() => setMouseIsOver(false)}
            onDrop={() => handleDrop(node.id)}
            nodeid={node.id}
            nodename={nodeName}
        >
            <div className={"navigation-node-inside" + ((depth >= 0) ? " lined" : "") + ((depth === 0) ? " white" : "")}>
                <span>{node.type}</span>{nodeName}
            </div>
        </div>
    )
}

export default NavigationNodeItem;
 