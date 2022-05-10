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
                <div className="text">0</div> 
            </div>
            <div className="margin-inside-wrapper">
                <div className="margin-left">
                <div className="text">0</div>
                </div>
                <div className="padding-wrapper">
                <div className="padding-top">

                    <SpacingStyleButton/>
                    

                    
                </div>
                <div className="margin-inside-wrapper">
                    <div className="padding-left">
                    <div className="text">0</div>
                    </div>
                    <div className="padding-inside-wrapper"></div>
                    <div className="padding-left">
                    <div className="text">0</div>
                    </div>
                </div>
                <div className="padding-top">
                    <div className="text">0</div>
                </div>
                </div>
                <div className="margin-left">
                <div className="text">0</div>
                </div>
            </div>
            <div className="margin-top">
                <div className="text">0</div>
            </div>
            </div>
        </div>
    )
}