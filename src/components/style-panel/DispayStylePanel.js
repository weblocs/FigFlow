import React from "react";
import DisplayStyleButton from "./DisplayStyleButton"

export default function DispayStylePanel () {
    return (
        <div className="style-panel-box">
            <div className="display-horizontal-grid">
                <div className="style-title-box">
                <div className="text">Display</div>
                </div>
                <div className="display-buttons-box">
                <DisplayStyleButton value="block" letter="B"/>
                <DisplayStyleButton value="flex" letter="F"/>
                <DisplayStyleButton value="grid" letter="G"/>
                <DisplayStyleButton value="inline" letter="I"/>
                <DisplayStyleButton value="inline-block" letter="IB"/>
                <DisplayStyleButton value="none" letter="N"/>
                </div>
            </div>
        </div>
    )
}