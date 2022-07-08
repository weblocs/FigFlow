import React from "react";
import { useSelector } from "react-redux";
import DisplayStyleButton from "./DisplayStyleButton"

export default function DispayStylePanel () {
    
    const activeStyleId = useSelector((state) => state.designerProjectState.activeStyleId)
    const stylesInActiveNode = useSelector((state) => state.designerProjectState.stylesInActiveNode)
    const preRenderedStyles = useSelector((state) => state.designerProjectState.preRenderedStyles)
    const activeStyleIndex = useSelector((state) => state.designerProjectState.activeStyleIndex)
    const activeProjectResolutionStylesListName = useSelector((state) => state.designerProjectState.activeProjectResolutionStylesListName)
    
    const activeStyleOptionIndex = useSelector((state) => state.designerProjectState.activeStyleOptionIndex);
    const nodeStyles = useSelector((state) => {
        if(activeStyleId === stylesInActiveNode?.[0]?.id) {
            return preRenderedStyles[activeStyleIndex];
        } else {
            return preRenderedStyles?.find(({id}) => id === stylesInActiveNode?.[0]?.id)?.childrens[activeStyleOptionIndex]?.options.find(({id}) => id === activeStyleId);
        }   
    })
    
    const doesStylePropertyBelongToActiveClass = useSelector((state) => {
        if (nodeStyles?.[activeProjectResolutionStylesListName]?.display !== undefined) {
            return true;
        }
        return false;
    });
    return (
        <div className="style-panel-box">
            <div className="display-horizontal-grid">
                <div className={"style-title-box" + ((doesStylePropertyBelongToActiveClass) ? " active" : "")}>
                    <div className="text">Display</div>
                </div>
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