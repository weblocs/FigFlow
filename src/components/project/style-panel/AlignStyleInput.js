import React from "react";
import AlignStyleInputButton from "./AlignStyleInputButton";
import ProprtyInputLabel from "./ProprtyInputLabel";

export default function AlignStyleInput () {
    return (
          <div className="display-horizontal-grid">
            <ProprtyInputLabel text="Align" property="text-align" />
            <div className="display-buttons-box">
              <AlignStyleInputButton letter="L" value="left" />
              <AlignStyleInputButton letter="C" value="center" />
              <AlignStyleInputButton letter="R" value="right" />
              <AlignStyleInputButton letter="J" value="justify" />
            </div>
          </div>
    )
}