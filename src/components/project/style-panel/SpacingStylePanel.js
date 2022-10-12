import React from "react";
import SpaceStyleInput from "./SpaceStyleInput";
import SpaceStyleInputNew from "./SpaceStyleInputNew";
import SpacingStyleButton from "./SpacingStyleButton"

export default function SpacingStylePanel () {
    return (
        <div className="style-panel-box">
            <div className="margin-wrapper">
            <div className="margin-top">
                <SpaceStyleInput style="margin-top" />
            </div>
            <div className="margin-inside-wrapper">
                <div className="margin-left">
                    <SpaceStyleInput style="margin-left" />
                </div>
                <div className="padding-wrapper">
                <div className="padding-top">
                    <SpaceStyleInput style="padding-top" />
                </div>
                <div className="margin-inside-wrapper">
                    <div className="padding-left">
                        <SpaceStyleInput style="padding-left" />
                    </div>
                    <div className="padding-inside-wrapper"></div>
                    <div className="padding-left">
                        <SpaceStyleInput style="padding-right" />
                    </div>
                </div>
                <div className="padding-top">
                    <SpaceStyleInput style="padding-bottom" />
                </div>
                </div>
                <div className="margin-left">
                    <SpaceStyleInput style="margin-right" />
                </div>
            </div>
            <div className="margin-top">
                <SpaceStyleInput style="margin-bottom" />
            </div>
            </div>
        </div>
    )
}