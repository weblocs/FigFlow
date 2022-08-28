import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import SaveButton from "./SaveButton";
import TopNavbarResolutionChangeButton from "./TopNavbarResolutionChangeButton";
import ModeChanger from "./ModeChanger";
import AddNodeButtonList from "./AddNodeButtonList";
import RightPanelButtonsList from "./RightPanelButtonsList";
import ExportButton from "./ExportButton";
import ProjectSidebarButton from "./ProjectSidebarButton";
import PageChanger from "./PageChanger";
import VersionsChanger from "./VersionsChanger";

export default function ProjectTopNavbar() {

    const projectMode = useSelector((state) => state.designerProjectState.projectMode);
    const dispatch = useDispatch()

    return (
      <div className="addNodeWrapper">
        <div className="projectNavigationLeft">
          <Link to="/"><div className="addNodeButton">we</div></Link>
          
          <ModeChanger />
          {(projectMode === "creator") && 
          <div style={{display:"flex"}}>
          <ProjectSidebarButton letter="C" tab="Collections" />
          </div>}
          <PageChanger />
          <VersionsChanger />
        </div>

        <div className={"centerNavbar" + ((projectMode === "creator") ? " creator-mode-list" : "")}>
          <TopNavbarResolutionChangeButton resolutionNumber="1" />
          {(projectMode === "developer") && (<>
          <TopNavbarResolutionChangeButton resolutionNumber="2" />
          <TopNavbarResolutionChangeButton resolutionNumber="3" />
          </>)}
          <TopNavbarResolutionChangeButton resolutionNumber="4" />
        </div>
        
        <div className="projectNavigationRight">
          <ExportButton />
          <SaveButton />
          <RightPanelButtonsList />
        </div>

      </div>
    )
}