import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import {addNodeToRenderedHTMLNodesAfterActiveNode, setActiveProjectResolution} from "../features/pre-rendered-html-nodes"
import ProjectRightSidebarButton from "./ProjectRightSidebarButton";
import SaveButton from "./SaveButton";
import TopNavbarResolutionChangeButton from "./TopNavbarResolutionChangeButton";
import ModeChanger from "./ModeChanger";



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
          <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("l"))}>L</div> 
          <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("sym"))}>Sy</div>
          <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("sec"))}>Se</div>
          <div className="addNodeButton" onClick={() => dispatch(addNodeToRenderedHTMLNodesAfterActiveNode("rich"))}>R</div>

          <ModeChanger />
        </div>

        <div className="centerNavbar">
          <TopNavbarResolutionChangeButton resolutionNumber="1" />
          <TopNavbarResolutionChangeButton resolutionNumber="2" />
          <TopNavbarResolutionChangeButton resolutionNumber="3" />
          <TopNavbarResolutionChangeButton resolutionNumber="4" />
          {/* <div className="addNodeButton" onClick={() => dispatch(setActiveProjectResolution("1"))}>1</div>
          <div className="addNodeButton" onClick={() => dispatch(setActiveProjectResolution("2"))}>2</div>
          <div className="addNodeButton" onClick={() => dispatch(setActiveProjectResolution("3"))}>3</div>
          <div className="addNodeButton" onClick={() => dispatch(setActiveProjectResolution("4"))}>4</div> */}
        </div>
        
        <div className="projectNavigationRight">
          <SaveButton />
          <ProjectRightSidebarButton letter="S" tab="Style" />
          <ProjectRightSidebarButton letter="D" tab="Settings" />
        </div>
        
      </div>
    )
}