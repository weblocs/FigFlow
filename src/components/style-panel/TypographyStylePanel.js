import React from "react";
import SizeStyleInput from "./SizeStyleInput"
import FontStyleEditor from "./FontStyleEditor";
import ColorPicker from "./ColorPicker";
import AlignStyleInput from "./AlignStyleInput";

export default function TypographyStylePanel () {
    return (
        <div className="style-panel-box">
        <div className="_1-col-style-grid">

          <FontStyleEditor />

          <div className="_2-col-style-grid">
              <SizeStyleInput style="font-size" text="Size" />
              <SizeStyleInput style="line-height" text="Height" />
          </div>

          <SizeStyleInput style="letter-spacing" text="Spacing" />

          <ColorPicker style="color" />
          
          <AlignStyleInput />

        </div>
      </div>
    )
}