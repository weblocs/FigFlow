import React from "react";
import SpaceStyleInput from "./SpaceStyleInput";
import SpacingStyleButton from "./SpacingStyleButton"

export default function SpacingStylePanel () {
    return (
        <div className="style-panel-box">
            <div className="margin-wrapper">
            <div className="margin-top">
                <SpaceStyleInput style="margin_top" />
            </div>
            <div className="margin-inside-wrapper">
                <div className="margin-left">
                    <SpaceStyleInput style="margin_left" />
                </div>
                <div className="padding-wrapper">
                <div className="padding-top">
                    <SpaceStyleInput style="padding_top" />
                </div>
                <div className="margin-inside-wrapper">
                    <div className="padding-left">
                        <SpaceStyleInput style="padding_left" />
                    </div>
                    <div className="padding-inside-wrapper"></div>
                    <div className="padding-left">
                        <SpaceStyleInput style="padding_right" />
                    </div>
                </div>
                <div className="padding-top">
                    <SpaceStyleInput style="padding_bottom" />
                </div>
                </div>
                <div className="margin-left">
                    <SpaceStyleInput style="margin_right" />
                </div>
            </div>
            <div className="margin-top">
                <SpaceStyleInput style="margin_bottom" />
            </div>
            </div>
        </div>
    )
}