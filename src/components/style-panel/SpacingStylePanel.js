import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import SpacingStyleButton from "./SpacingStyleButton"


export default function SpacingStylePanel () {
    const activeStyleIndex = useSelector((state) => state.designerProjectState.activeStyleIndex)
    const paddingTopStyle = useSelector((state) => state.designerProjectState.preRenderedStyles[activeStyleIndex]?.styles ["padding_top"])

    return (
        <div className="style-panel-box">
            <div className="margin-wrapper">
            <div className="margin-top">
                <SpacingStyleButton style="margin_top"/>
            </div>
            <div className="margin-inside-wrapper">
                <div className="margin-left">
                    <SpacingStyleButton style="margin-left"/>
                </div>
                <div className="padding-wrapper">
                <div className="padding-top">
                    <SpacingStyleButton style="padding_top"/>
                </div>
                <div className="margin-inside-wrapper">
                    <div className="padding-left">
                        <SpacingStyleButton style="padding_left"/>
                    </div>
                    <div className="padding-inside-wrapper"></div>
                    <div className="padding-left">
                        <SpacingStyleButton style="padding_right"/>
                    </div>
                </div>
                <div className="padding-top">
                    <SpacingStyleButton style="padding_bottom"/>
                </div>
                </div>
                <div className="margin-left">
                    <SpacingStyleButton style="margin_right"/>
                </div>
            </div>
            <div className="margin-top">
                <SpacingStyleButton style="margin_bottom"/>
            </div>
            </div>
        </div>
    )
}