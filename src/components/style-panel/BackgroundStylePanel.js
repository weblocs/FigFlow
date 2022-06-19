import React from "react";
import ColorPicker from "./ColorPicker";
import ColorStyleInput from "./ColorStyleInput"

export default function BackgroundStylePanel () {

    return (
        <div className="style-panel-box">
      <div className="_1-col-style-grid">
        <ColorPicker style="background-color" />
      </div>
    </div>
    )
}