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
import ProjectSymbolsPanel from "./components/ProjectSymbolsPanel"
import ProjectSectionsPanel from "./components/ProjectSectionsPanel"

import {loadProjectFromFirebasePreRenderedNodesAndStyles} from "./utils/save-load-project"
import loadShortcuts from "./utils/shortcuts"
import ProjectImagesPanel from "./components/ProjectImagesPanel";
import { useDispatch } from "react-redux";

import {setProjectMode} from "./features/pre-rendered-html-nodes"
import ProjectRichTextPanel from "./components/ProjectRichTextPanel";
import StoreUseEffectUpdates from "./components/StoreUseEffectUpdates";
import ProjectAddPanel from "./components/ProjectAddPanel";

export default function DevMode() {
  
  const dispatch = useDispatch();
  dispatch(setProjectMode("developer"));

  loadProjectFromFirebasePreRenderedNodesAndStyles();
  loadShortcuts();

  return (
    <>

      <StoreUseEffectUpdates />
      
      <ProjectTopNavbar />
    
      <div className="projectWrapper">
        <ProjectSidebar />
        <ProjectNavigator />
        <ProjectAddPanel />
        <ProjectPagesPanel />
        <ProjectCollectionsPanel />
        <ProjectImagesPanel />
        <ProjectCollectionsItemsPanel />
        <ProjectCollectionsFieldsPanel />
        <ProjectSymbolsPanel />
        <ProjectSectionsPanel />
        <ProjectRichTextPanel />

        <ProjectRenderedDesign />
          
        <ProjectStylePanel />
        <ProjectSettingsPanel />
        
      </div>
    </>
  );
}
