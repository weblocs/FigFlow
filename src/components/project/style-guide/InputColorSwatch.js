import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChromePicker } from 'react-color'
import { editSwatch } from '../../../features/project'

export default function StyleGuideColorSwatch({ swatch, index }) {
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)

  function handleColorPickerChange(color, event) {
    dispatch(
      editSwatch({
        id: swatch.id,
        name: swatch.name,
        color: color.hex,
      })
    )
  }

  return (
    <div className="style-guide-swatch-wrap">
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{ background: swatch.color }}
        className="style-guide-swatch-palet"
      ></div>
      {swatch.name}
      {isOpen && (
        <div
          className={
            'absolute-color-picker' + (index % 2 === 1 ? ' right-side' : '')
          }
        >
          <ChromePicker
            color={swatch.color}
            onChange={handleColorPickerChange}
          />
        </div>
      )}
    </div>
  )
}
