import React from "react";
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import SaveButton from "./SaveButton";
import TopNavbarResolutionChangeButton from "./TopNavbarResolutionChangeButton";
import ModeChanger from "./ModeChanger";
import AddNodeButtonList from "./AddNodeButtonList";
import RightPanelButtonsList from "./RightPanelButtonsList";

export default function ProjectTopNavbar() {

    const dispatch = useDispatch()

    return (
      <div className="addNodeWrapper">
        <div className="projectNavigationLeft">
          <Link to="/"><div className="addNodeButton">we</div></Link>
          <AddNodeButtonList />
          <ModeChanger />
        </div>

        <div className="centerNavbar">
          <TopNavbarResolutionChangeButton resolutionNumber="1" />
          <TopNavbarResolutionChangeButton resolutionNumber="2" />
          <TopNavbarResolutionChangeButton resolutionNumber="3" />
          <TopNavbarResolutionChangeButton resolutionNumber="4" />
        </div>
        
        <div className="projectNavigationRight">
          <SaveButton />
          <RightPanelButtonsList />
        </div>

      </div>
    )
}