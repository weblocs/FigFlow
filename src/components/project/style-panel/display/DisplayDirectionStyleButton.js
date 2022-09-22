import React from "react";

import { useDispatch, useSelector } from 'react-redux'
import { editStyleProperty } from "../../../../features/project";

export default function DisplayDirectionStyleButton (props) {

    const activeStyleIndex = useSelector((state) => state.project.activeStyleIndex)
    const activeStyleId = useSelector((state) => state.project.activeStyleId)
    const stylesInActiveNode = useSelector((state) => state.project.stylesInActiveNode)
    const preRenderedStyles = useSelector((state) => state.project.preRenderedStyles)
    const activeStyleOptionIndex = useSelector((state) => state.project.activeStyleOptionIndex);
    
    const nodeStyles = useSelector((state) => {
      if(activeStyleId === stylesInActiveNode?.[0]?.id) {
          return preRenderedStyles[activeStyleIndex];
      } else {
          return preRenderedStyles?.find(({id}) => id === stylesInActiveNode?.[0]?.id)?.childrens[activeStyleOptionIndex]?.options.find(({id}) => id === activeStyleId);
      }   
    })

    const displayStyle = useSelector((state) => nodeStyles?.styles ["flex-direction"])
    const displayDirectionWithoutReverse = displayStyle?.replace("-reverse","");
    const isDirectionReversed = displayStyle?.includes("-reverse");

    

    const dispatch = useDispatch()

    function handleClick() {
      (!isDirectionReversed) ?
      dispatch(editStyleProperty(["flex-direction", props.value])) :
      dispatch(editStyleProperty(["flex-direction", props.value + "-reverse"]))
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