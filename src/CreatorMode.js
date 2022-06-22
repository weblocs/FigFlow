import React from "react";
import ProjectTopNavbar from "./components/ProjectTopNavbar"
import ProjectRenderedDesign from "./components/ProjectRenderedDesign"

import {loadProjectFromFirebasePreRenderedNodesAndStyles} from "./utils/save-load-project"
import loadShortcuts from "./utils/shortcuts"
import ProjectImagesPanel from "./components/ProjectImagesPanel";
import { useDispatch } from "react-redux";

import {setProjectMode} from "./features/pre-rendered-html-nodes"
import AddSectionPopUp from "./components/AddSectionPopUp";

export default function CreatorMode() {

  const dispatch = useDispatch();
  dispatch(setProjectMode("creator"));

  loadProjectFromFirebasePreRenderedNodesAndStyles();
  loadShortcuts();

  return (
    <>
      <AddSectionPopUp />
      <ProjectTopNavbar />
      <div className="projectWrapper">
        <ProjectRenderedDesign />
      </div>
    </>
  );
}
