import { useDispatch, useSelector } from 'react-redux'
import { editStyleProperty } from "../../../../features/project";
import { deleteUnits } from "../../../../utils/style-panel";

export default function DisplayDirectionStyleButton (props) {

    const displayStyle = useSelector((state) => deleteUnits(state.project.activeStyleObject?.[props.style.replace("-","_")]) || deleteUnits(state.project.activeNodeComputedStyles?.[props.style.replace("-","_")]));
    const displayDirectionWithoutReverse = displayStyle?.replace("-reverse","");
    const isDirectionReversed = displayStyle?.includes("-reverse");
    const dispatch = useDispatch()

    function handleClick() {
      (!isDirectionReversed) ?
      dispatch(editStyleProperty([props.style, props.value])) :
      dispatch(editStyleProperty([props.style, props.value + "-reverse"]))
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