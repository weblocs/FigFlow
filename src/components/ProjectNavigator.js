import React from "react";

import { useSelector, useDispatch } from 'react-redux'

import FileExplorerTheme from "react-sortable-tree-theme-file-explorer";
import SortableTree from "react-sortable-tree";

import {setPreRenderedHTMLNodes,setActiveNodeId, setActiveNodeAndStyle, deleteNodeByIdInPreRenderedHTMLNodes, setHoveredNodeId} from "../features/pre-rendered-html-nodes"

export default function ProjectNavigator() {

    const preRenderedHTMLNodes = useSelector((state) => state.designerProjectState.preRenderedHTMLNodes)
    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId)
    const hoveredNodeId = useSelector((state) => state.designerProjectState.hoveredNodeId)

    function handleNavigatorNodeOnClick (_id,_styleName) {
        dispatch(setActiveNodeAndStyle([_id,_styleName]));
    }

    

    const dispatch = useDispatch()
    

    return (
        <SortableTree
          className="navigatorWrapper"
          canNodeHaveChildren={(node) => node.type === "div"}
          onChange={(treeData) => dispatch(setPreRenderedHTMLNodes([...treeData]))}
          isVirtualized={false}
          treeData={preRenderedHTMLNodes} 
          theme={FileExplorerTheme}
          
          generateNodeProps={({ node, path }) => ({
            title: (
              <div 
              onMouseOver={() => dispatch(setHoveredNodeId(node.id))}
              onMouseOut={() => dispatch(setHoveredNodeId(""))}

              className={"navigatorElement " + ((node.id == activeNodeId) ? "active " : " ") + ((node.id == hoveredNodeId) ? "hovered " : " ")} >
                <span className="typeSeparator">
                  {node.type}
                </span>
                <span onClick={() => handleNavigatorNodeOnClick(node.id,node?.class[0]?.name)}>
                  {(node?.class[0]?.name !== undefined) ? node?.class[0]?.name : node?.type}
                </span>
                
                <div
                  className="todoListItemDelete"
                  onClick={() => {
                    dispatch(deleteNodeByIdInPreRenderedHTMLNodes(node.id));
                  }}
                >x</div>
              </div>
            )
          })}
        />
    )
}
