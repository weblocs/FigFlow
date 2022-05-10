import React, {useState} from "react";

import StylePanelHeader from "./style-panel/StylePanelHeader"
import StylePanelTitle from "./style-panel/StylePanelTitle"
import DispayStylePanel from "./style-panel/DispayStylePanel"
import SpacingStylePanel from "./style-panel/SpacingStylePanel"
import SizeStylePanel from "./style-panel/SizeStylePanel"
// import OverflowStylePanel from "./style-panel/OverflowStylePanel"
import TypographyStylePanel from "./style-panel/TypographyStylePanel"
import BackgroundStylePanel from "./style-panel/BackgroundStylePanel"


export default function ProjectStylePanel() {

    
    return (
        <>
        <div className="style-panel">

        <StylePanelHeader />


            
    

    <StylePanelTitle title="Layout" />
    <DispayStylePanel />

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

    <div className="style-panel-box">
      <div className="_1-col-style-grid">
        <div className="size-style-box">
          <div className="style-title-box">
            <div className="text">Radius</div>
          </div>
          <div className="input"></div>
        </div>
        <div className="_2-col-style-grid">
          <div className="size-style-box">
            <div className="style-title-box">
              <div className="text">Color</div>
            </div>
            <div className="input"></div>
          </div>
          <div className="size-style-box">
            <div className="style-title-box">
              <div className="text">Width</div>
            </div>
            <div className="input"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

        </>
    )
    
}