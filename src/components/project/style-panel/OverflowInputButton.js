import { useDispatch, useSelector } from 'react-redux'
import { editStyleProperty } from '../../../features/project';

export default function OverflowInputButton({value,letter}) {
    const activeStyleValue = useSelector((state) => state.project.activeStyleObject?.overflow || state.project.activeNodeComputedStyles?.overflow);
    const dispatch = useDispatch()

    return (
        <div 
        className={"display-button" + ((activeStyleValue === value) ? " active" : "")}
        onClick={() => dispatch(editStyleProperty(["overflow", value]))}>
            <div className="text">{letter}</div>
        </div>
    )
}