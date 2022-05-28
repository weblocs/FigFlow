import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from 'react-redux'

import FileExplorerTheme from "react-sortable-tree-theme-file-explorer";
import SortableTree from "react-sortable-tree";

import {setPreRenderedHTMLNodes, setActiveNodeAndStyle, deleteNodeByIdInPreRenderedHTMLNodes, setHoveredNodeId} from "../features/pre-rendered-html-nodes"
import NavigationNodeFolder from "./NavigationNodeFolder";

export default function ProjectNavigator() {
    
    const preRenderedHTMLNodes = useSelector((state) => state.designerProjectState.preRenderedHTMLNodes)
    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId)
    const hoveredNodeId = useSelector((state) => state.designerProjectState.hoveredNodeId)
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)
    const projectSymbols = useSelector((state) => state.designerProjectState.projectSymbols)
    const dispatch = useDispatch()

    useEffect(() => {
      // console.log(preRenderedHTMLNodes);
    },[preRenderedHTMLNodes]);
    
    return (
      <div className={"navigatorWrapper "+ ((activeProjectTab === "Navigator") ? "active" : "" )}>


        {preRenderedHTMLNodes.map((node) => (
          <div key={node.id}>
              <NavigationNodeFolder node={node} depth={0} />
          </div>
        ))}

        
        
        </div>
    )
}