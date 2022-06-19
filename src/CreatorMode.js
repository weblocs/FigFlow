import React from "react";
import ProjectTopNavbar from "./components/ProjectTopNavbar"
import ProjectRenderedDesign from "./components/ProjectRenderedDesign"

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
        <ProjectRenderedDesign />
      </div>
    </>
  );
}
