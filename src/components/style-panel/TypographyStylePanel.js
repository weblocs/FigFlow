import React from "react";
import ColorStyleInput from "./ColorStyleInput"
import SizeStyleInput from "./SizeStyleInput"
import FontStyleEditor from "./FontStyleEditor";
import ColorPicker from "./ColorPicker";

export default function TypographyStylePanel () {
    return (
        <div className="style-panel-box">
        <div className="_1-col-style-grid">

          <FontStyleEditor />

          <div className="_2-col-style-grid">
              <SizeStyleInput style="font-size" text="Size" />
              <SizeStyleInput style="line-height" text="Height" />
          </div>
          <ColorPicker style="color" />
          
          <div className="display-horizontal-grid">
            <div className="style-title-box">
              <div className="text">Align</div>
            </div>
            <div className="display-buttons-box">
              <div className="display-button">
                <div className="text">L</div>
              </div>
              <div className="display-button">
                <div className="text">C</div>
              </div>
              <div className="display-button">
                <div className="text">R</div>
              </div>
              <div className="display-button">
                <div className="text">J</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}