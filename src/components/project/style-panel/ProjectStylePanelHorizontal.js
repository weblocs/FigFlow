import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import StylePanelHeader from './StylePanelHeader'
import StylePanelTitle from './StylePanelTitle'
import DispayStylePanel from './display/DispayStylePanel'
import SpacingStylePanel from './SpacingStylePanel'
import SizeStylePanel from './SizeStylePanel'
import TypographyStylePanel from './TypographyStylePanel'
import BackgroundStylePanel from './BackgroundStylePanel'
import DispayFlexStylePanel from './display/DisplayFlexStylePanel'
import DisplayGridStylePanel from './display/DisplayGridStylePanel'
import DisplayFlexChildStylePanel from './display/DisplayFlexChildStylePanel'
import BorderStylePanel from './border/BorderStylePanel'
import EffectsStylePanel from './EffectsStylePanel'
import PositionStylePanel from './PositionStylePanel'
import OverflowStylePanel from './OverflowStylePanel'
import ShadowStyleEditor from './ShadowStyleEditor'

export default function ProjectStylePanelHorizontal() {
  const projectMode = useSelector((state) => state.project.projectMode)
  const activeRightSidebarTab = useSelector(
    (state) => state.project.activeRightSidebarTab
  )

  return (
    <div className="flex bg-black">
      <div className="style-panel_column sticky left-0 z-10 bg-black">
        <StylePanelHeader />
        <DisplayFlexChildStylePanel />
      </div>

      <div className="style-panel_column">
        {/* <StylePanelTitle title="Layout" /> */}
        <DispayStylePanel />
        <DispayFlexStylePanel />
        <DisplayGridStylePanel />
      </div>

      <div className="style-panel_column">
        {/* <StylePanelTitle title="Spacing" /> */}
        <SpacingStylePanel />
      </div>

      <div className="style-panel_column">
        {/* <StylePanelTitle title="Size" /> */}
        <SizeStylePanel />

        {/* <StylePanelTitle title="Overflow" /> */}
        <OverflowStylePanel />
      </div>

      <div className="style-panel_column">
        {/* <StylePanelTitle title="Typography" /> */}
        <TypographyStylePanel />
      </div>

      {/* <StylePanelTitle title="Position" /> */}

      <div className="style-panel_column">
        <PositionStylePanel />

        {/* <StylePanelTitle title="Background" /> */}
        <BackgroundStylePanel />
      </div>

      <div className="style-panel_column">
        {/* <StylePanelTitle title="Border" /> */}
        <BorderStylePanel />
      </div>

      <div className="style-panel_column">
        {/* <StylePanelTitle title="Effects" /> */}
        <EffectsStylePanel />

        {/* <StylePanelTitle title="Shadow" /> */}
        <ShadowStyleEditor />
      </div>
    </div>
  )
}
