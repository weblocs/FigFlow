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
    <div className="select-input-wrap">
      <select
        className="style-panel-select text"
        value={nodeStyleValue}
        onChange={handleInputChange}
      >
        <option value="initial">Initial</option>
        <option value="solid">Line</option>
        <option value="dotted">Dotted</option>
        <option value="dash">Dashed</option>
        <option value="hidden">Hidden</option>
      </select>
    </div>
  )
}
