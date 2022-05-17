import React from "react";
import AddPreRenderedNodeForm from "./components/AddPreRenderedNodeForm"
import ProjectSidebar from "./components/ProjectSidebar"
import ProjectNavigator from "./components/ProjectNavigator"
import ProjectRenderedDesign from "./components/ProjectRenderedDesign"

import ProjectStylePanel from "./components/ProjectStylePanel"
import ProjectPagesPanel from "./components/ProjectPagesPanel";
import ProjectCollectionsPanel from "./components/ProjectCollectionsPanel";

import SaveButton from "./components/atoms/SaveButton"
import {loadProjectFromFirebasePreRenderedNodesAndStyles} from "./utils/save-load-project"
import loadShortcuts from "./utils/shortcuts"

export default function FigFlow(props) {

  loadProjectFromFirebasePreRenderedNodesAndStyles(props.projectSlug);
  loadShortcuts();

  return (
    <>
      <SaveButton projectSlug={props.projectSlug} />
      <AddPreRenderedNodeForm />
    
      <div className="projectWrapper">
        <ProjectSidebar />
        <ProjectNavigator />
        <ProjectPagesPanel />
        <ProjectCollectionsPanel />

        <ProjectRenderedDesign />

        <ProjectStylePanel />
      </div>
    </>
  );
}
