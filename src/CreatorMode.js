import React from "react";
import ProjectTopNavbar from "./components/ProjectTopNavbar"
import ProjectRenderedDesign from "./components/ProjectRenderedDesign"

import {loadProjectFromFirebasePreRenderedNodesAndStyles} from "./utils/save-load-project"
import loadShortcuts from "./utils/shortcuts"
import ProjectImagesPanel from "./components/ProjectImagesPanel";
import { useDispatch } from "react-redux";

import {setProjectMode} from "./features/pre-rendered-html-nodes"
import AddSectionPopUp from "./components/AddSectionPopUp";
import AddRichTextElementPopUp from "./components/AddRichTextElementPopUp";
import StoreUseEffectUpdates from "./components/StoreUseEffectUpdates";
import ProjectNavigator from "./components/ProjectNavigator";

export default function CreatorMode() {

  const dispatch = useDispatch();
  dispatch(setProjectMode("creator"));

  loadProjectFromFirebasePreRenderedNodesAndStyles();
  loadShortcuts();

  return (
    <>
    <div className="user-panel">
      <StoreUseEffectUpdates />
      <ProjectNavigator />

      <AddSectionPopUp />
      <AddRichTextElementPopUp />
      <ProjectTopNavbar />
    </div>
      <div className="projectWrapper">
        <ProjectRenderedDesign />
      </div>
    </>
  );
}
