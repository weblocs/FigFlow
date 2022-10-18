import { useDispatch, useSelector } from 'react-redux'
import { editStyleProperty } from '../../../features/project';

export default function PositionInput() {
    const nodeStyleValue = useSelector((state) => state.project.activeNodeComputedStyles?.position);
    const dispatch = useDispatch()

    function handleInputChange(e) {
        dispatch(editStyleProperty(["position",e.target.value]));
    }

    return (
        <select className="style-panel-select text" value={nodeStyleValue} onChange={handleInputChange}>
            <option value="static">Static</option>
            <option value="relative">Relative</option>
            <option value="absolute">Absolute</option>
            <option value="fixed">Fixed</option>
            <option value="sticky">Sticky</option>
        </select>
    )
}