import React from "react";
import ProjectTopNavbar from "./components/ProjectTopNavbar"
import ProjectSidebar from "./components/ProjectSidebar"
import ProjectNavigator from "./components/ProjectNavigator"
import ProjectRenderedDesign from "./components/ProjectRenderedDesign"

import ProjectStylePanel from "./components/ProjectStylePanel"
import ProjectPagesPanel from "./components/ProjectPagesPanel";
import ProjectCollectionsPanel from "./components/ProjectCollectionsPanel";
import ProjectCollectionsFieldsPanel from "./components/ProjectCollectionsFieldsPanel"
import ProjectCollectionsItemsPanel from "./components/ProjectCollectionsItemsPanel";
import ProjectSettingsPanel from "./components/ProjectSettingsPanel";

import {loadProjectFromFirebasePreRenderedNodesAndStyles} from "./utils/save-load-project"
import loadShortcuts from "./utils/shortcuts"
import ProjectImagesPanel from "./components/ProjectImagesPanel";

export default function FigFlow() {

  loadProjectFromFirebasePreRenderedNodesAndStyles();
  loadShortcuts();

  return (
    <>
      
      <ProjectTopNavbar />
    
      <div className="projectWrapper">
        <ProjectSidebar />
        <ProjectNavigator />
        <ProjectPagesPanel />
        <ProjectCollectionsPanel />
        <ProjectImagesPanel />
        <ProjectCollectionsItemsPanel />
        <ProjectCollectionsFieldsPanel />

        <ProjectRenderedDesign />
          
        <ProjectStylePanel />
        <ProjectSettingsPanel />
        
      </div>
    </>
  );
}
