import React, { useEffect } from "react";
import AddPreRenderedNodeForm from "./components/AddPreRenderedNodeForm"
import ProjectNavigator from "./components/ProjectNavigator"
import ProjectRenderedDesign from "./components/ProjectRenderedDesign"

import ProjectStylePanelOld from "./components/ProjectStylePanelOld"
import ProjectStylePanel from "./components/ProjectStylePanel"

import SaveButton from "./components/atoms/SaveButton"
import {loadProjectPreRenderedNodesAndStyles, loadProjectFromFirebasePreRenderedNodesAndStyles} from "./utils/save-load-project"
import loadShortcuts from "./utils/shortcuts"

export default function FigFlow(props) {

  // loadProjectPreRenderedNodesAndStyles(props.projectId);
  loadProjectFromFirebasePreRenderedNodesAndStyles(props.projectSlug);
  loadShortcuts();

  return (
    <>
      <SaveButton projectSlug={props.projectSlug} />
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
