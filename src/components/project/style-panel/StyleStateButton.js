import { useDispatch, useSelector } from 'react-redux'
import { setStyleState } from '../../../features/project'

export default function StyleStateButton({state}) {
    const styleState = useSelector((state) => state.project.styleState)
    const dispatch = useDispatch()

    return (
        <div className={'style-state_item' + ((state === styleState) ? " active" : "")}
        onClick={() => dispatch(setStyleState(state))}>{state}</div>
    )
}