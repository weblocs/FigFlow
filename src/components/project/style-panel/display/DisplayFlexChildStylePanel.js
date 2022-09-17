import React from "react";
import { useSelector } from "react-redux";
import DisplayFlexChildSizingButton from "./DisplayFlexChildSizingButton";



export default function DisplayFlexChildStylePanel () {

    const isActiveNodeParentDisplayStyleFlex = useSelector((state) => state.designerProjectState.isActiveNodeParentDisplayStyleFlex)
    const activeStyleIndex = useSelector((state) => state.designerProjectState.activeStyleIndex)
    const displayStyle = useSelector((state) => state.designerProjectState.preRenderedStyles[activeStyleIndex]?.styles ["display"])

    if(isActiveNodeParentDisplayStyleFlex) {
        return (
            <div className="style-panel-box">
                <div className="text" style={{marginBottom: "12px"}}>Flex Child</div>
                <div className="display-horizontal-grid">
                    <div className="style-title-box">
                        <div className="text">Sizing</div>
                    </div>
                    <div className="display-buttons-box">
                        <DisplayFlexChildSizingButton value="shrink" letter="S"/>
                        <DisplayFlexChildSizingButton value="grow" letter="G"/>
                        <DisplayFlexChildSizingButton value="dont" letter="D"/>
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