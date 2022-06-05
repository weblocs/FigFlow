import React from "react";
import { useSelector } from "react-redux";
import DisplayDirectionStyleButton from "./DisplayDirectionStyleButton"
import DisplayDirectionReverseStyleButton from "./DisplayDirectionReverseStyleButton"
import DisplayStyleButton from "./DisplayStyleButton";
import SpacingStyleButton from "./SpacingStyleButton";
import DisplayFlexWrapStyleButton from "./DisplayFlexWrapStyleButton";
import DisplayGridColumnsRowsEditor from "./DisplayGridColumnsRowsEditor";



export default function DisplayGridStylePanel () {

    const activeStyleIndex = useSelector((state) => state.designerProjectState.activeStyleIndex)
    const displayStyle = useSelector((state) => state.designerProjectState.preRenderedStyles[activeStyleIndex]?.styles ["display"])

    if(displayStyle === "grid") {
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