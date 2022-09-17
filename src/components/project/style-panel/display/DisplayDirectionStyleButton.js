import React from "react";

import { useDispatch, useSelector } from 'react-redux'
import { editStyleInPreRenderedStyles } from "../../../../features/pre-rendered-html-nodes";

export default function DisplayDirectionStyleButton (props) {

    const activeStyleIndex = useSelector((state) => state.designerProjectState.activeStyleIndex)
    const activeStyleId = useSelector((state) => state.designerProjectState.activeStyleId)
    const stylesInActiveNode = useSelector((state) => state.designerProjectState.stylesInActiveNode)
    const preRenderedStyles = useSelector((state) => state.designerProjectState.preRenderedStyles)
    const activeStyleOptionIndex = useSelector((state) => state.designerProjectState.activeStyleOptionIndex);
    
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
      dispatch(editStyleInPreRenderedStyles(["flex-direction", props.value])) :
      dispatch(editStyleInPreRenderedStyles(["flex-direction", props.value + "-reverse"]))
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