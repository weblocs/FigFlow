import { useDispatch } from 'react-redux'
import { editFontStyle } from '../../../features/project'

export default function FontStyleSelect({ fontId, weight }) {
  const dispatch = useDispatch()

  function handleChange(e) {
    dispatch(
      editFontStyle({
        fontId: fontId,
        weightId: weight.id,
        style: e.target.value,
      })
    )
  }

  return (
    <div>
      <select onChange={handleChange} value={weight.style}>
        <option value="normal">Normal</option>
        <option value="italic">Italic</option>
      </select>
    </div>
  )
}
