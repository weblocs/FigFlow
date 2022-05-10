import React, { useEffect } from "react";
import AddPreRenderedNodeForm from "./components/AddPreRenderedNodeForm"
import ProjectNavigator from "./components/ProjectNavigator"
import ProjectRenderedDesign from "./components/ProjectRenderedDesign"

import ProjectStylePanelOld from "./components/ProjectStylePanelOld"
import ProjectStylePanel from "./components/ProjectStylePanel"

import SaveButton from "./components/atoms/SaveButton"
import {loadProjectPreRenderedNodesAndStyles} from "./utils/save-load-project"
import loadShortcuts from "./utils/shortcuts"


export default function FigFlow() {

  loadProjectPreRenderedNodesAndStyles();
  loadShortcuts();

  return (
    <>
      <div onKeyDown={() => console.log("30")} tabIndex="-1" ></div>
      <SaveButton />
      <AddPreRenderedNodeForm />
    
      <div className="projectWrapper">
        <ProjectNavigator />
        <ProjectRenderedDesign />

        {/* <ProjectStylePanelOld /> */}
        <ProjectStylePanel />

      </div>
    </>
  );
}
