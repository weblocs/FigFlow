import React from "react";

import { useDispatch, useSelector } from 'react-redux'
import {editStyleInPreRenderedStyles} from "../../features/pre-rendered-html-nodes"


export default function DisplayStyleButton (props) {

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

    const displayStyle = useSelector((state) => nodeStyles?.styles [props.style])

    const dispatch = useDispatch()

    return (
        <div
            className={"display-button " + ((displayStyle === props.value) ? "active" : "")}
            onClick={() => dispatch(editStyleInPreRenderedStyles([props.style, props.value]))}
          >
            <div className="text">{props.letter}</div>
          </div>
    )
}