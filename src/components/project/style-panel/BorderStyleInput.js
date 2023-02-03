import { useDispatch, useSelector } from 'react-redux'
import { editStyleProperty } from '../../../features/project'

export default function BorderStyleInput() {
  const nodeStyleValue = useSelector(
    (state) => state.project.activeNodeComputedStyles?.border_style
  )
  const dispatch = useDispatch()

  function handleInputChange(e) {
    dispatch(editStyleProperty(['border-style', e.target.value]))
  }

  return (
    <div className="input">
      <select
        className="style-panel-select text"
        value={nodeStyleValue}
        onChange={handleInputChange}
      >
        <option value="initial">Hidden</option>
        <option value="solid">Line</option>
        <option value="dotted">Dotted</option>
        <option value="dash">Dashed</option>
      </select>
    </div>
  )
}
