import React from "react";

import { useDispatch, useSelector } from 'react-redux'
import { editStyleProperty } from "../../../../features/project";


export default function DisplayFlexWrapStyleButton (props) {

    const activeStyleIndex = useSelector((state) => state.project.activeStyleIndex)
    const displayStyle = useSelector((state) => state.project.preRenderedStyles[activeStyleIndex]?.styles ["flex-wrap"])
    const displayDirectionWithoutReverse = displayStyle?.replace("-reverse","");
    const isDirectionReversed = displayStyle?.includes("-reverse");

    const dispatch = useDispatch()

    function handleClick() {
      (!isDirectionReversed ) ?
      dispatch(editStyleProperty(["flex-wrap", props.value])) :
      dispatch(editStyleProperty(["flex-wrap", props.value + "-reverse"]))
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