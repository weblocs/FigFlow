import React from "react";
import SpacingStyleButton from "./SpacingStyleButton";
import ColorStyleInput from "./ColorStyleInput"
import SizeStyleInput from "./SizeStyleInput"
import { useSelector } from "react-redux";

export default function TypographyStylePanel () {
  const projectUploadedFonts = useSelector((state) => state.designerProjectState.projectUploadedFonts)
    return (
        <div className="style-panel-box">
        <div className="_1-col-style-grid">
          
          <div className="size-style-box">

            <div className="style-title-box">
              <div className="text">Font</div>
            </div>
            <div className="input">
              <select>
                {projectUploadedFonts.map((font) => (
                  <option>{font.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="size-style-box">
            <div className="style-title-box">
              <div className="text">Weight</div>
            </div>
            <div className="input"></div>
          </div>
          <div className="_2-col-style-grid">
              <SizeStyleInput style="font-size" text="Size" />
              <SizeStyleInput style="line-height" text="Height" />
          </div>
          <div className="size-style-box">
            <div className="style-title-box">
              <div className="text">Color</div>
            </div>
            <div className="input">
                <ColorStyleInput style="color" />
            </div>
          </div>
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