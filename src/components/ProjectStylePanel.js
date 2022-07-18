import React, {useState} from "react";
import { useSelector } from "react-redux";

import StylePanelHeader from "./style-panel/StylePanelHeader"
import StylePanelTitle from "./style-panel/StylePanelTitle"
import DispayStylePanel from "./style-panel/DispayStylePanel"
import SpacingStylePanel from "./style-panel/SpacingStylePanel"
import SizeStylePanel from "./style-panel/SizeStylePanel"
// import OverflowStylePanel from "./style-panel/OverflowStylePanel"
import TypographyStylePanel from "./style-panel/TypographyStylePanel"
import BackgroundStylePanel from "./style-panel/BackgroundStylePanel"
import DispayFlexStylePanel from "./style-panel/DisplayFlexStylePanel";
import DisplayGridStylePanel from "./style-panel/DisplayGridStylePanel";
import DisplayFlexChildStylePanel from "./style-panel/DisplayFlexChildStylePanel";
import BorderStylePanel from "./style-panel/BorderStylePanel";
import EffectsStylePanel from "./style-panel/EffectsStylePanel";
import PositionStylePanel from "./PositionStylePanel";

export default function ProjectStylePanel() {
  const projectMode = useSelector((state) => state.designerProjectState.projectMode)
  
  const activeRightSidebarTab = useSelector((state) => state.designerProjectState.activeRightSidebarTab)
    return (
      (projectMode === "developer") ?
      <div className={"style-panel "+ ((activeRightSidebarTab === "Style") ? "active" : "" )}>

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
        <PositionStylePanel />

        <StylePanelTitle title="Background" />
        <BackgroundStylePanel />
        
        <StylePanelTitle title="Border" />
        <BorderStylePanel />

        <StylePanelTitle title="Effects" />
        <EffectsStylePanel />

      </div> :
      <></>
    )
    
}