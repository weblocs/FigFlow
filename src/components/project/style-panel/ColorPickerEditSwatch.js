import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editSwatch } from '../../../features/project'

export default function ColorPickerEditSwatch({
  setColorPickerState,
  activeSwatchId,
  swatchName,
  color,
}) {
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const dispatch = useDispatch()

  const inputRef = useRef()

  function handleEdit() {
    dispatch(
      editSwatch({
        id: activeSwatchId,
        color: color,
        name: inputRef.current.value,
      })
    )
    setColorPickerState('')
  }

  useEffect(() => {
    inputRef.current.value = swatchName
  }, [])

  return (
    <div>
      <div className="add-swatch-wrap">
        <div className="text">Edit swatch</div>
        <input ref={inputRef} className="edit-node-input" />
        <div className="add-swatch-buttons delete-buttons">
          <button onClick={handleEdit} className="add-swatch-button">
            Edit
          </button>
          <div
            className="add-swatch-button"
            onClick={() => setColorPickerState('picked')}
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  )
}
