import React from "react";
import SpacingStyleButton from "./SpacingStyleButton";
import ColorStyleInput from "./ColorStyleInput"

export default function TypographyStylePanel () {

    return (
        <div className="style-panel-box">
        <div className="_1-col-style-grid">
          <div className="size-style-box">
            <div className="style-title-box">
              <div className="text">Font</div>
            </div>
            <div className="input"></div>
          </div>
          <div className="size-style-box">
            <div className="style-title-box">
              <div className="text">Weight</div>
            </div>
            <div className="input"></div>
          </div>
          <div className="_2-col-style-grid">
            <div className="size-style-box">
              <div className="style-title-box">
                <div className="text">Size</div>
              </div>
              <div className="input">
                  <SpacingStyleButton style="font_size" />
              </div>
            </div>
            <div className="size-style-box">
              <div className="style-title-box">
                <div className="text">Height</div>
              </div>
              <div className="input">
                <SpacingStyleButton style="line_height" />
              </div>
            </div>
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