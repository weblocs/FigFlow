import React, {useState} from "react";
import { useSelector } from "react-redux";

import StylePanelHeader from "./StylePanelHeader";
import StylePanelTitle from "./StylePanelTitle";
import DispayStylePanel from "./display/DispayStylePanel";
import SpacingStylePanel from "./SpacingStylePanel"
import SizeStylePanel from "./SizeStylePanel"
import TypographyStylePanel from "./TypographyStylePanel"
import BackgroundStylePanel from "./BackgroundStylePanel"
import DispayFlexStylePanel from "./display/DisplayFlexStylePanel";
import DisplayGridStylePanel from "./display/DisplayGridStylePanel";
import DisplayFlexChildStylePanel from "./display/DisplayFlexChildStylePanel";
import BorderStylePanel from "./BorderStylePanel";
import EffectsStylePanel from "./EffectsStylePanel";
import PositionStylePanel from "./PositionStylePanel";

export default function ProjectStylePanel() {
  const projectMode = useSelector((state) => state.designerProjectState.projectMode)
  
  const activeRightSidebarTab = useSelector((state) => state.designerProjectState.activeRightSidebarTab)
    return (
      (projectMode === "developer") &&
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

      </div> 
    )
}