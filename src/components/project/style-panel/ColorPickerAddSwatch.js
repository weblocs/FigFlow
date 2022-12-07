import { useDispatch, useSelector } from 'react-redux'
import { addSwatch, editStyleProperty } from '../../../features/project'
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useRef } from 'react'

export default function ColorPickerAddSwatch({ cancelClick, color, style }) {
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const dispatch = useDispatch()
  const id = uuidv4()

  const inputRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()
    if (e.target.name.value !== '') {
      dispatch(
        addSwatch({
          id: id,
          name: e.target.name.value,
          color: color,
        })
      )
      cancelClick()
      dispatch(editStyleProperty([style, '{{' + id + '}}']))
    }
  }

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <form onSubmit={handleSubmit} className="add-swatch-wrap">
      <div className="text">Add swatch</div>
      <input
        ref={inputRef}
        className="edit-node-input"
        type="text"
        name="name"
        placeholder="Name"
      />
      <div className="add-swatch-buttons">
        <button className="add-swatch-button add-button">Add</button>
        <div className="add-swatch-button" onClick={cancelClick}>
          Cancel
        </div>
      </div>
    </form>
  )
}
