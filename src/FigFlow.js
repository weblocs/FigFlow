import React, { useEffect } from "react";
import AddPreRenderedNodeForm from "./components/AddPreRenderedNodeForm"
import AddPreRenderedStyleForm from "./components/AddPreRenderedStyleForm"
import ProjectNavigator from "./components/ProjectNavigator"
import ProjectRenderedDesign from "./components/ProjectRenderedDesign"
import ProjectStylePanel from "./components/ProjectStylePanel"
import SaveButton from "./components/atoms/SaveButton"
import {loadProjectPreRenderedNodesAndStyles} from "./utils/save-load-project"

export default function FigFlow() {

  loadProjectPreRenderedNodesAndStyles()

  return (
    <>
      <SaveButton />
      <AddPreRenderedNodeForm />

      <AddPreRenderedStyleForm />
    
      <div className="projectWrapper">
        <ProjectNavigator />
        <ProjectRenderedDesign />
        <ProjectStylePanel />
      </div>
    </>
  );
}
