import React from "react";
import SizeStyleInput from "./SizeStyleInput";

export default function SizeStylePanel () {
    return (
        <div className="style-panel-box">
            <div className="_2-col-style-grid">
                <SizeStyleInput style="width" text="Width" placeholder="auto" />
                <SizeStyleInput style="height" text="Height" placeholder="auto" />
                <SizeStyleInput style="min-width" text="Min W"/>
                <SizeStyleInput style="min-height" text="Min H"/>
                <SizeStyleInput style="max-width" text="Max W"/>
                <SizeStyleInput style="max-height" text="Max H"/>
            </div>
        </div>
    )
}