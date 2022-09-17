import React from "react";

import { useDispatch, useSelector } from 'react-redux'
import { editStyleInPreRenderedStyles } from "../../../../features/pre-rendered-html-nodes";


export default function DisplayFlexWrapStyleButton (props) {

    const activeStyleIndex = useSelector((state) => state.designerProjectState.activeStyleIndex)
    const displayStyle = useSelector((state) => state.designerProjectState.preRenderedStyles[activeStyleIndex]?.styles ["flex-wrap"])
    const displayDirectionWithoutReverse = displayStyle?.replace("-reverse","");
    const isDirectionReversed = displayStyle?.includes("-reverse");

    const dispatch = useDispatch()

    function handleClick() {
      (!isDirectionReversed ) ?
      dispatch(editStyleInPreRenderedStyles(["flex-wrap", props.value])) :
      dispatch(editStyleInPreRenderedStyles(["flex-wrap", props.value + "-reverse"]))
    }

    return (
        <div
            className={"display-button " + ((displayDirectionWithoutReverse === props.value) ? "active" : "")}
            onClick={handleClick}
          >
            <div className="text">{props.letter}</div>
          </div>
    )
}