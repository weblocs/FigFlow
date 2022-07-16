import React from "react";
import { useSelector } from "react-redux";
import DisplayDirectionStyleButton from "./DisplayDirectionStyleButton"
import DisplayDirectionReverseStyleButton from "./DisplayDirectionReverseStyleButton"
import DisplayStyleButton from "./DisplayStyleButton";
import SpacingStyleButton from "./SpacingStyleButton";
import DisplayFlexWrapStyleButton from "./DisplayFlexWrapStyleButton";
import ProprtyInputLabel from "./ProprtyInputLabel";



export default function DispayFlexStylePanel () {

    const activeStyleIndex = useSelector((state) => state.designerProjectState.activeStyleIndex)
    const activeStyleId = useSelector((state) => state.designerProjectState.activeStyleId)
    const preRenderedStyles = useSelector((state) => state.designerProjectState.preRenderedStyles)
    const stylesInActiveNode = useSelector((state) => state.designerProjectState.stylesInActiveNode)
    const activeProjectResolutionStylesListName = useSelector((state) => state.designerProjectState.activeProjectResolutionStylesListName)

    const activeStyleOptionIndex = useSelector((state) => state.designerProjectState.activeStyleOptionIndex);
    const nodeStyles = useSelector((state) => {
        if(activeStyleId === stylesInActiveNode?.[0]?.id) {
            return preRenderedStyles[activeStyleIndex];
        } else {
            return preRenderedStyles?.find(({id}) => id === stylesInActiveNode?.[0]?.id)?.childrens[activeStyleOptionIndex]?.options.find(({id}) => id === activeStyleId);
        }   
    })

    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId);

    const displayStyle = useSelector((state) => {
        if(activeNodeId !== "") {
            try {
                const activeNode = document.querySelector(`[el_id="${activeNodeId}"]`);
                return getComputedStyle(activeNode)?.display;
            } catch {
            }
        }
    });

    const directionIsSet = useSelector((state) => {
        if (nodeStyles?.[activeProjectResolutionStylesListName]?.["flex-direction"] !== undefined) {
            return true;
        }
        return false;
    });

    const alignIsSet = useSelector((state) => {
        if (nodeStyles?.[activeProjectResolutionStylesListName]?.["align-items"] !== undefined) {
            return true;
        }
        return false;
    });

    const justifyIsSet = useSelector((state) => {
        if (nodeStyles?.[activeProjectResolutionStylesListName]?.["justify-content"] !== undefined) {
            return true;
        }
        return false;
    });

    if(displayStyle === "flex") {
        return (
            <div className="style-panel-box">

                <div className="display-horizontal-grid with-margin">
                    <ProprtyInputLabel text="Direction" property="flex-direction" />
                    <div className="display-buttons-box">
                        <DisplayDirectionStyleButton value="row" letter="Horizontal"/>
                        <DisplayDirectionStyleButton value="column" letter="Vertical"/>
                    </div>
                    <DisplayDirectionReverseStyleButton />
                </div>

                <div className="display-horizontal-grid with-margin">
                    <div className={"style-title-box" + ((alignIsSet) ? " active" : "")}>
                        <div className="text">Align</div>
                    </div>
                    <div className="display-buttons-box">
                        <DisplayStyleButton style="align-items" value="flex-start" letter="S"/>
                        <DisplayStyleButton style="align-items" value="center" letter="C"/>
                        <DisplayStyleButton style="align-items" value="flex-end" letter="E"/>
                        <DisplayStyleButton style="align-items" value="stretch" letter="S"/>
                        <DisplayStyleButton style="align-items" value="baseline" letter="B"/>
                    </div>
                </div>

                <div className="display-horizontal-grid with-margin">
                    <div className={"style-title-box" + ((justifyIsSet) ? " active" : "")}>
                        <div className="text">Justify</div>
                    </div>
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

                <div className="display-horizontal-grid with-margin">
                    <div className="style-title-box">
                        <div className="text">Children</div>
                    </div>
                    <div className="display-buttons-box">
                        <DisplayFlexWrapStyleButton value="nowrap" letter="Don't Wrap"/>
                        <DisplayFlexWrapStyleButton value="wrap" letter="Wrap"/>
                    </div>
                    <DisplayDirectionReverseStyleButton />
                </div>


            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
    
}