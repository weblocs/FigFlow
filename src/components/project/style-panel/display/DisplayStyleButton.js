
import { useDispatch, useSelector } from 'react-redux'
import { editStyleInPreRenderedStyles } from "../../../../features/pre-rendered-html-nodes";
import { activeStyleProperties } from '../../../../selectors/active-style-properties';

export default function DisplayStyleButton (props) {
    
    const state = useSelector(state => state);
    const displayStyle = activeStyleProperties(state)?.[props.style];
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