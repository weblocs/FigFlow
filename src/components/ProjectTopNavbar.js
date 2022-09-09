import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import SaveButton from "./SaveButton";
import TopNavbarResolutionChangeButton from "./TopNavbarResolutionChangeButton";
import RightPanelButtonsList from "./RightPanelButtonsList";
import ExportButton from "./ExportButton";
import ProjectSidebarButton from "./ProjectSidebarButton";
import PageChanger from "./PageChanger";
import VersionsChanger from "./VersionsChanger";
import DesktopIcon from '../img/desktop.svg';
import TabletIcon from '../img/tablet.svg';
import PortraitIcon from '../img/portrait.svg';
import MobileIcon from '../img/mobile.svg';
import DatabaseIcon from '../img/database.svg';
import ProjectLogo from "./ProjectLogo";

export default function ProjectTopNavbar() {

    const projectMode = useSelector((state) => state.designerProjectState.projectMode);
    const dispatch = useDispatch()

    return (
      <div className="addNodeWrapper">
        <div className="projectNavigationLeft">
          
          <ProjectLogo />

          {(projectMode === "creator") && 
          <div style={{display:"flex"}}>
          <ProjectSidebarButton letter="C" tab="Collections" img={DatabaseIcon} />
          </div>}
          <PageChanger />
          <VersionsChanger />
        </div>

        <div className={"centerNavbar" + ((projectMode === "creator") ? " creator-mode-list" : "")}>
          <TopNavbarResolutionChangeButton resolutionNumber="1" image={DesktopIcon} />
          {(projectMode === "developer") && (<>
          <TopNavbarResolutionChangeButton resolutionNumber="2" image={TabletIcon}  />
          <TopNavbarResolutionChangeButton resolutionNumber="3" image={PortraitIcon}  />
          </>)}
          <TopNavbarResolutionChangeButton resolutionNumber="4" image={MobileIcon}  />
        </div>
        
        <div className="projectNavigationRight">
          {(projectMode === "developer") && (<>
            <ExportButton />
          </>)}
          <SaveButton />
          <RightPanelButtonsList />
        </div>

      </div>
    )
}