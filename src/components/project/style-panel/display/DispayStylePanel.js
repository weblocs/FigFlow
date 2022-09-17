import React from "react";
import DisplayStyleButton from "./DisplayStyleButton"
import ProprtyInputLabel from "../ProprtyInputLabel";

export default function DispayStylePanel () {

    return (
        <div className="style-panel-box">
            <div className="display-horizontal-grid">
                <ProprtyInputLabel text="Display" property="display" />
                <div className="display-buttons-box">
                <DisplayStyleButton style="display" value="block" letter="B"/>
                <DisplayStyleButton style="display" value="flex" letter="F"/>
                <DisplayStyleButton style="display" value="grid" letter="G"/>
                <DisplayStyleButton style="display" value="inline" letter="I"/>
                <DisplayStyleButton style="display" value="inline-block" letter="IB"/>
                <DisplayStyleButton style="display" value="none" letter="N"/>
                </div>
            </div>
        </div>
    )
}