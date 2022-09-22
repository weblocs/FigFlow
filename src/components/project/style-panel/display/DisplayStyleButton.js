
import { useDispatch, useSelector } from 'react-redux'
import { editStyleProperty } from "../../../../features/project";
import { activeStyleProperties } from '../../../../selectors/active-style-properties';

export default function DisplayStyleButton (props) {
    
    const displayStyle = useSelector(state => activeStyleProperties(state))?.[props.style];
    const dispatch = useDispatch();

    return (
      <div
        className={"display-button " + ((displayStyle === props.value) ? "active" : "")}
        onClick={() => dispatch(editStyleProperty([props.style, props.value]))}>
          <div className="text">{props.letter}</div>
      </div>
    )
}