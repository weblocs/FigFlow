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
import ProjectLayoutsPanel from "./components/ProjectLayoutsPanel"

import {loadProjectFromFirebasePreRenderedNodesAndStyles} from "./utils/save-load-project"
import loadShortcuts from "./utils/shortcuts"
import ProjectImagesPanel from "./components/ProjectImagesPanel";
import { useDispatch, useSelector } from "react-redux";

import {setProjectMode} from "./features/pre-rendered-html-nodes"
import ProjectRichTextPanel from "./components/ProjectRichTextPanel";
import StoreUseEffectUpdates from "./components/StoreUseEffectUpdates";
import ProjectAddPanel from "./components/ProjectAddPanel";
import AddSectionPopUp from "./components/AddSectionPopUp";
import AddRichTextElementPopUp from "./components/AddRichTextElementPopUp";
import PageSettingsPanel from "./components/PageSettingsPanel";
import UpdateSymbolButton from "./components/UpdateSymbolButton";

export default function DevMode() {
  
  const offlineMode = useSelector((state) => state.designerProjectState.offlineMode)
  const dispatch = useDispatch();

  

  loadProjectFromFirebasePreRenderedNodesAndStyles();
  loadShortcuts();

  return (
    <>
      <StoreUseEffectUpdates />
      <AddSectionPopUp />
      
      
      <div className="user-panel">
        <ProjectTopNavbar />
        <AddRichTextElementPopUp />
        <UpdateSymbolButton />
      </div>
      
      <div className="projectWrapper">
        
        <div className="user-panel flex-panel">
        <ProjectSidebar />
        <ProjectNavigator />
        <ProjectAddPanel />
        <ProjectPagesPanel />
        <PageSettingsPanel />
        <ProjectCollectionsPanel />
        {(!offlineMode) && <ProjectImagesPanel />}
        <ProjectCollectionsItemsPanel />
        <ProjectCollectionsFieldsPanel />
        <ProjectSymbolsPanel />
        <ProjectLayoutsPanel />
        <ProjectRichTextPanel />
        </div>

        <ProjectRenderedDesign />
          
        <div className="user-panel">
        <ProjectStylePanel />
        <ProjectSettingsPanel />
        </div>

      </div>
    </>
  );
}
