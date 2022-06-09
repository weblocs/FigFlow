import React from "react";
import ColorStyleInput from "./ColorStyleInput"

export default function BackgroundStylePanel () {

    return (
        <div className="style-panel-box">
      <div className="_1-col-style-grid">
        <div className="size-style-box">
          <div className="style-title-box">
            <div className="text">Color</div>
          </div>
          <div className="input">
              <ColorStyleInput style="background_color" />
          </div>
        </div>
      </div>
    </div>
    )
}