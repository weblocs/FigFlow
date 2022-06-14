import React from "react";
import SpaceStyleInput from "./SpaceStyleInput";

import SpacingStyleButton from "./SpacingStyleButton"



export default function SizeStylePanel () {

    return (
        <div className="style-panel-box">
            <div className="_2-col-style-grid">
                <SpaceStyleInput style="width" text="Width" placeholder="auto" />
                <SpaceStyleInput style="height" text="Height" placeholder="auto" />
                <SpaceStyleInput style="min_width" text="Min W"/>
                <SpaceStyleInput style="min_height" text="Min H"/>
                <SpaceStyleInput style="max_width" text="Max W"/>
                <SpaceStyleInput style="max_height" text="Max H"/>
            </div>
        </div>
    )
}