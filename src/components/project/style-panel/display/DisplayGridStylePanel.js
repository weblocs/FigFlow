import React from "react";
import { useSelector } from "react-redux";
import SizeStyleInput from "../SizeStyleInput";
import SpacingStyleButton from "../SpacingStyleButton";
import DisplayGridColumnsRowsEditor from "./DisplayGridColumnsRowsEditor";

export default function DisplayGridStylePanel () {

    const displayStyle = useSelector((state) => state.project.activeNodeComputedStyles?.display)

    return (
        <div className={"style-panel-box" + ((displayStyle !== "grid") ? " hidden" : "")} >

            <DisplayGridColumnsRowsEditor />

            <div className="display-horizontal-grid with-margin">
                <div style={{width:"100%"}}>
                    <div className="_2-col-style-grid">
                        <SizeStyleInput style="grid-column-gap" text="Column Gap" />
                        <SizeStyleInput style="grid-row-gap" text="Row Gap" />
                    </div>
                </div>
            </div>
        </div>
    )
}