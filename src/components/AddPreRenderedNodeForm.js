import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import {addNodeToRenderedHTMLNodesAfterActiveNode} from "../features/pre-rendered-html-nodes"
import ProjectRightSidebarButton from "./ProjectRightSidebarButton";

export default function AddPreRenderedNodeForm() {

    const dispatch = useDispatch()

    return (
      <div className="addNodeWrapper">
        <div className="projectNavigationLeft">
          <Link to="/"><div className="addNodeButton">we</div></Link>
          <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("div"))}>D</div>
          <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("h"))}>H</div>
          <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("p"))}>P</div> 
          <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("col"))}>C</div> 
        </div>
          
      
        <ProjectRightSidebarButton />
      
      </div>
    )
}