import { useDispatch, useSelector } from 'react-redux'
import { deleteSwatch } from '../../../features/project'

export default function ColorPickerDeleteSwatch({
  activeSwatchId,
  color,
  setColorPickerState,
}) {
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const dispatch = useDispatch()

  function handleDelete() {
    dispatch(deleteSwatch({ id: activeSwatchId, value: color }))
    setColorPickerState('')
  }

  return (
    <div className="add-swatch-wrap">
      <div className="text">Delete swatch</div>
      <div className="add-swatch-buttons delete-buttons">
        <button
          onClick={handleDelete}
          className="add-swatch-button delete-button"
        >
          Delete
        </button>
        <div
          className="add-swatch-button"
          onClick={() => setColorPickerState('picked')}
        >
          Cancel
        </div>
      </div>
    </div>
  )
}
