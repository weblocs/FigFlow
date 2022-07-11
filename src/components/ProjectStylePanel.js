import React, {useState} from "react";

import StylePanelHeader from "./style-panel/StylePanelHeader"
import StylePanelTitle from "./style-panel/StylePanelTitle"
import DispayStylePanel from "./style-panel/DispayStylePanel"
import SpacingStylePanel from "./style-panel/SpacingStylePanel"
import SizeStylePanel from "./style-panel/SizeStylePanel"
// import OverflowStylePanel from "./style-panel/OverflowStylePanel"
import TypographyStylePanel from "./style-panel/TypographyStylePanel"
import BackgroundStylePanel from "./style-panel/BackgroundStylePanel"
import { useSelector } from "react-redux";
import DispayFlexStylePanel from "./style-panel/DisplayFlexStylePanel";
import DisplayGridStylePanel from "./style-panel/DisplayGridStylePanel";
import DisplayFlexChildStylePanel from "./style-panel/DisplayFlexChildStylePanel";
import BorderStylePanel from "./style-panel/BorderStylePanel";

export default function ProjectStylePanel() {

  const activeRightSidebarTab = useSelector((state) => state.designerProjectState.activeRightSidebarTab)
    return (
        <>
        <div
        className={"style-panel "+ ((activeRightSidebarTab === "Style") ? "active" : "" )} >

        <StylePanelHeader />


            
    
    <DisplayFlexChildStylePanel />
    <StylePanelTitle title="Layout" />
    <DispayStylePanel />

   
    <DispayFlexStylePanel />
    
    <DisplayGridStylePanel />


    <StylePanelTitle title="Spacing" />
    <SpacingStylePanel />


    <StylePanelTitle title="Size" />
    <SizeStylePanel />

    {/* <StylePanelTitle title="Overflow" />
    <OverflowStylePanel /> */}

    <StylePanelTitle title="Typography" />
    <TypographyStylePanel />
    
    

    <StylePanelTitle title="Size" />
    <div className="style-panel-box">
      <div className="display-horizontal-grid">
        <div className="style-title-box postion-title-box">
          <div className="text">Position</div>
        </div>
        <div className="position-box">
          <div className="possition-select">
            <div className="text">Relative</div>
          </div>
          <div className="padding-wrapper">
            <div className="padding-top">
              <div className="text">0</div>
            </div>
            <div className="margin-inside-wrapper">
              <div className="padding-left">
                <div className="text">0</div>
              </div>
              <div className="padding-inside-wrapper"></div>
              <div className="padding-left">
                <div className="text">0</div>
              </div>
            </div>
            <div className="padding-top">
              <div className="text">0</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <StylePanelTitle title="Background" />
    <BackgroundStylePanel />
    
    <StylePanelTitle title="Border" />
    <BorderStylePanel />

  </div>

        </>
    )
    
}