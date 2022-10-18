import { useDispatch, useSelector } from 'react-redux'
import { editStyleProperty } from '../../../features/project';

export default function ObjectFitStyleInput() {
    const nodeStyleValue = useSelector((state) => state.project.activeNodeComputedStyles?.object_fit);
    const dispatch = useDispatch();

    function handleInputChange(e) {
        dispatch(editStyleProperty(["object-fit",e.target.value]));
    }

    return (
        <select className="style-panel-select text" value={nodeStyleValue} onChange={handleInputChange}>
            <option value="fill">Fill</option>
            <option value="cover">Cover</option>
            <option value="contain">Contain</option>
        </select>
    )
}