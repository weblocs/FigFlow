import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";

import Arrow from '../img/arrow-down.svg';
import {setHoveredNodeId, setActiveNodeId, setDragableCopiedNodes, setDraggedOverNodeId, pasteDraggedNodes, setDraggedBefore, toggleNodeExpandedState, setEditedSymbolId} from "../features/pre-rendered-html-nodes"

 function NavigationNodeItem ({parents, node, depth}) {
    const dispatch = useDispatch()
    const hoveredNodeId = useSelector((state) => state.designerProjectState.hoveredNodeId)
    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId)
    const projectSymbols = useSelector((state) => state.designerProjectState.projectSymbols)
    const dragableCopiedNodes = useSelector((state) => state.designerProjectState.dragableCopiedNodes)
    const draggedOverNodeId = useSelector((state) => state.designerProjectState.draggedOverNodeId)
    const draggedBefore = useSelector((state) => (state.designerProjectState.draggedBefore) ? true : false)
    const editedSymbolId = useSelector((state) => state.designerProjectState.editedSymbolId)
    const nodeObject = useSelector((state) => state.designerProjectState.activeNodeObject)

    const nodeName = (node?.symbolId === undefined) ? 
    ((node?.class[0]?.name !== undefined) ? node?.class[0]?.name : node?.type) : 
    (projectSymbols.find( ({id}) => id === node.symbolId)?.name );

    function handleClick () {
        dispatch(setActiveNodeId({id: node.id}));
    }

    function handleDragStart () {
        dispatch(setDragableCopiedNodes(node.id));
    }

    function handleDragOver () {
        event.preventDefault();
        let id = node.id;
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
            if ( draggedOverNodeId !== "" ) { 
                dispatch(setDraggedOverNodeId(""));
            }
        }
        
    }

    function handleDrop () {
        dispatch(pasteDraggedNodes());
    }

    function handleArrowClick() {
        if(node.children.length > 0) {
            dispatch(toggleNodeExpandedState(node.id));
        }
    }

    return ( 
        <div className={"navigation-node " + ((draggedBefore) ? "dragged-before " : "") + ((node.id === draggedOverNodeId) ? "dragged-over " : " ") + ((node.id == activeNodeId) ? "active " : " ") + ((node.id == hoveredNodeId) ? "hovered " : " ")}
            style={{paddingLeft: depth*8 + "px"}}
            onMouseOver={() => dispatch(setHoveredNodeId(node.id))}
            onMouseOut={() => dispatch(setHoveredNodeId(""))}
            onClick={handleClick}
            // onDoubleClick={() => handleDoubleClick(node.id)} // openSymbol here
            draggable="true"
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            nodeid={node.id}
            nodename={nodeName}
            nodetype={node.type}
            nodecmscollectionid={node?.cmsCollectionId}
        >
            <div 
            onDoubleClick={() => (node.type === "sym" && editedSymbolId.symbolId === "") && dispatch(setEditedSymbolId({symbolId:nodeObject.symbolId, elementId: nodeObject.id}))}
            className={"navigation-node-inside" + ((node.type === "sym") ? " symbol-nav-item" : "") + ((depth >= 0) ? " lined" : "") + ((depth === 0) ? " white" : "")}
            onClick={handleArrowClick}>
                {(node.children.length > 0) && (
                    <img src={Arrow} className={"node-folder-arrow" + ((node?.expanded) ? " expanded" : "")} />
                )}
                <span>{node.type}</span>{nodeName}
            </div>
        </div>
    )
}

export default NavigationNodeItem;
 