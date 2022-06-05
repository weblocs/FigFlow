import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import {addNodeToRenderedHTMLNodesAfterActiveNode, setActiveProjectResolution} from "../features/pre-rendered-html-nodes"
import ProjectRightSidebarButton from "./ProjectRightSidebarButton";
import SaveButton from "./SaveButton";


export default function ProjectTopNavbar() {

    const dispatch = useDispatch()

    return (
      <div className="addNodeWrapper">
        <div className="projectNavigationLeft">
          <Link to="/"><div className="addNodeButton">we</div></Link>
          <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("div"))}>D</div>
          <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("h"))}>H</div>
          <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("p"))}>P</div> 
          <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("col"))}>C</div>
          <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("img"))}>I</div>
          <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("sym"))}>S</div>
          <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("l"))}>L</div> 
        </div>

        <div className="centerNavbar">
          <div className="addNodeButton" onClick={() => dispatch(setActiveProjectResolution("1"))}>D</div>
          <div className="addNodeButton" onClick={() => dispatch(setActiveProjectResolution("2"))}>T</div>
          <div className="addNodeButton" onClick={() => dispatch(setActiveProjectResolution("3"))}>P</div>
          <div className="addNodeButton" onClick={() => dispatch(setActiveProjectResolution("4"))}>M</div>
        </div>
        
        <div className="projectNavigationRight">
          <SaveButton />
          <ProjectRightSidebarButton letter="S" tab="Style" />
          <ProjectRightSidebarButton letter="D" tab="Settings" />
        </div>
        
      </div>
    )
}