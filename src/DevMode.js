import React from "react";
import ProjectTopNavbar from "./components/project/top-navbar/TopNavbar";
import LeftSidebar from "./components/project/left-sidebar/LeftSidebar"
import ProjectNavigator from "./components/project/left-sidebar/navigator/ProjectNavigator"
import ProjectRenderedDesign from "./components/project/rendered-view/ProjectRenderedDesign"

import ProjectStylePanel from "./components/project/style-panel/ProjectStylePanel"
import ProjectPagesPanel from "./components/project/left-sidebar/pages/ProjectPagesPanel";
import ProjectCollectionsPanel from "./components/project/left-sidebar/collections/ProjectCollectionsPanel";
import ProjectCollectionsFieldsPanel from "./components/project/left-sidebar/collections/ProjectCollectionsFieldsPanel"
import ProjectCollectionsItemsPanel from "./components/project/left-sidebar/collections/ProjectCollectionsItemsPanel";
import ProjectSettingsPanel from "./components/project/settings-panel/ProjectSettingsPanel";
import ProjectSymbolsPanel from "./components/project/left-sidebar/symbols/ProjectSymbolsPanel"
import ProjectLayoutsPanel from "./components/project/left-sidebar/layouts/ProjectLayoutsPanel"

import {loadProjectFromFirebasePreRenderedNodesAndStyles} from "./utils/save-load-project"
import loadShortcuts from "./utils/shortcuts"
import ProjectImagesPanel from "./components/project/left-sidebar/images/ProjectImagesPanel";
import { useDispatch, useSelector } from "react-redux";
import ProjectRichTextPanel from "./components/project/left-sidebar/blocks/ProjectRichTextPanel";
import StoreUseEffectUpdates from "./components/StoreUseEffectUpdates";
import ProjectAddPanel from "./components/project/left-sidebar/navigator/ProjectAddPanel";
import AddSectionModal from "./components/project/modals/AddSection";
import PageSettingsPanel from "./components/project/left-sidebar/pages/PageSettingsPanel";
import UpdateSymbolButton from "./components/project/rendered-view/_atoms/UpdateSymbolButton";

export default function DevMode() {
  
  const offlineMode = useSelector((state) => state.designerProjectState.offlineMode)
  const dispatch = useDispatch();

  

  loadProjectFromFirebasePreRenderedNodesAndStyles();
  loadShortcuts();

  return (
    <>
      <StoreUseEffectUpdates />
      <AddSectionModal />
      
      
      <div className="user-panel">
        <ProjectTopNavbar />
        <UpdateSymbolButton />
      </div>
      
      <div className="projectWrapper">
        
        <div className="user-panel flex-panel">
        <LeftSidebar />
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
