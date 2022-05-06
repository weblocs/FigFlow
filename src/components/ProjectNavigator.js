import React from "react";

import { useSelector, useDispatch } from 'react-redux'

import FileExplorerTheme from "react-sortable-tree-theme-file-explorer";
import SortableTree from "react-sortable-tree";

import {setPreRenderedHTMLNodes, setActiveNodeAndStyle, deleteNodeByIdInPreRenderedHTMLNodes} from "../features/pre-rendered-html-nodes"

export default function ProjectNavigator() {

    const preRenderedHTMLNodes = useSelector((state) => state.designerProjectState.preRenderedHTMLNodes)

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
              <div>
                <span className="typeSeparator">{node.type}</span>
                <span onClick={() => dispatch(setActiveNodeAndStyle([node.id,node.class[0].name]))}>{node.class[0].name}</span>
                
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
