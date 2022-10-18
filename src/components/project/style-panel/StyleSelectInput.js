import { useDispatch, useSelector } from 'react-redux'
import { editStyleProperty } from '../../../features/project';

export default function StyleSelectInput({style, options}) {
    const activeStyleValue = useSelector((state) => state.project.activeNodeComputedStyles?.[style.replace("-","_")]);
    const dispatch = useDispatch()

    function handleInputChange(e) {
        dispatch(editStyleProperty([style,e.target.value]));
    }

    return (
        <div className="input">
            <select className="style-panel-select text" onChange={handleInputChange} value={activeStyleValue?.replaceAll('"',"")}>
                {options.map((option) => (
                    <option value={option.name} key={option.name}>{option.name}</option>
                ))}
            </select>
        </div>
    )
}