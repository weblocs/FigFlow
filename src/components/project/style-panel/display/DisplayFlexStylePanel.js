import React from "react";
import { useSelector } from "react-redux";
import DisplayDirectionStyleButton from "./DisplayDirectionStyleButton"
import DisplayDirectionReverseStyleButton from "./DisplayDirectionReverseStyleButton"
import DisplayStyleButton from "./DisplayStyleButton";
import SpacingStyleButton from "../SpacingStyleButton";
import DisplayFlexWrapStyleButton from "./DisplayFlexWrapStyleButton";
import ProprtyInputLabel from "../ProprtyInputLabel";
import SizeStyleInput from "../SizeStyleInput";

export default function DispayFlexStylePanel () {

    const displayStyle = useSelector((state) => state.project.activeNodeComputedStyles?.["display"])    

        return (
            <div className={"style-panel-box" + ((displayStyle !== "flex") ? " hidden" : "")} >

                <div className="display-horizontal-grid with-margin">
                    <ProprtyInputLabel text="Direction" property="flex-direction" />
                    <div className="display-buttons-box">
                        <DisplayDirectionStyleButton style="flex-direction" value="row" letter="Horizontal"/>
                        <DisplayDirectionStyleButton style="flex-direction" value="column" letter="Vertical"/>
                    </div>
                    <DisplayDirectionReverseStyleButton style="flex-direction" />
                </div>

                <div className="display-horizontal-grid with-margin">
                    <ProprtyInputLabel text="Align" property="align-items" />
                    <div className="display-buttons-box">
                        <DisplayStyleButton style="align-items" value="flex-start" letter="S"/>
                        <DisplayStyleButton style="align-items" value="center" letter="C"/>
                        <DisplayStyleButton style="align-items" value="flex-end" letter="E"/>
                        <DisplayStyleButton style="align-items" value="stretch" letter="S"/>
                        <DisplayStyleButton style="align-items" value="baseline" letter="B"/>
                    </div>
                </div>

                <div className="display-horizontal-grid with-margin">
                    <ProprtyInputLabel text="Justify" property="justify-content" />
                    <div className="display-buttons-box">
                        <DisplayStyleButton style="justify-content" value="flex-start" letter="T"/>
                        <DisplayStyleButton style="justify-content" value="center" letter="C"/>
                        <DisplayStyleButton style="justify-content" value="flex-end" letter="B"/>
                        <DisplayStyleButton style="justify-content" value="space-between" letter="S"/>
                        <DisplayStyleButton style="justify-content" value="space-around" letter="A"/>
                    </div>
                </div>


                <div className="display-horizontal-grid with-margin">
                    <div style={{width:"100%"}}>
                        <div className="_2-col-style-grid">
                            <SizeStyleInput style="grid-column-gap" text="Column Gap" />
                            <SizeStyleInput style="grid-row-gap" text="Row Gap" />
                        </div>
                    </div>
                </div>

                <div className="display-horizontal-grid with-margin">
                    <div className="style-title-box">
                        <div className="text">Children</div>
                    </div>
                    <div className="display-buttons-box">
                        {/* <DisplayFlexWrapStyleButton value="nowrap" letter="Don't Wrap"/>
                        <DisplayFlexWrapStyleButton value="wrap" letter="Wrap"/> */}

                        <DisplayDirectionStyleButton style="flex-wrap" value="nowrap" letter="Don't Wrap"/>
                        <DisplayDirectionStyleButton style="flex-wrap" value="wrap" letter="Wrap"/>
                    </div>
                    {/* <DisplayDirectionReverseStyleButton style="flex-wrap" /> */}
                </div>


            </div>
        )
}