import React from "react";
import { useSelector } from "react-redux";
import SpacingStyleButton from "../SpacingStyleButton";
import DisplayGridColumnsRowsEditor from "./DisplayGridColumnsRowsEditor";

export default function DisplayGridStylePanel () {

    const activeNodeComputedStyle = useSelector((state) => state.project.activeNodeComputedStyles?.display)

    if(activeNodeComputedStyle === "grid") {
        return (
            <div className="style-panel-box">

                <DisplayGridColumnsRowsEditor />

                <div className="display-horizontal-grid with-margin">
                    <div style={{width:"100%"}}>
                        <div className="_2-col-style-grid">
                            <div className="size-style-box">
                                <div className="style-title-box">
                                <div className="text">Column Gap</div>
                                </div>
                                <div className="input">
                                    <SpacingStyleButton style="grid-column-gap" />
                                </div>
                            </div>
                            <div className="size-style-box">
                                <div className="style-title-box">
                                <div className="text">Row Gap</div>
                                </div>
                                <div className="input">
                                <SpacingStyleButton style="grid-row-gap" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}