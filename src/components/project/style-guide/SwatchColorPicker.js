import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function StyleGuideColorPicker({
  styleValue,
  dispatchEditStyle,
}) {
  const swatches = useSelector((state) => state.project.projectSwatches)
  const colorValue = useSelector((state) => {
    const isPropertySwatch =
      styleValue?.charAt(0) === '{' && styleValue?.charAt(1) === '{'

    if (isPropertySwatch) {
      let value = styleValue.replaceAll('{{', '').replaceAll('}}', '')
      value = state.project.projectSwatches.find(
        (swatch) => swatch.id === value
      )
      return { color: value?.color, name: value?.name, id: value?.id }
    } else {
      return { color: styleValue, name: styleValue, id: '' }
    }
  })

  const [isOpen, setIsOpen] = useState(false)

  function handleSwatchClick(id) {
    dispatchEditStyle(`{{${id}}}`)
    setIsOpen(false)
  }

  return (
    <div className="style-guide-swatch-wraper">
      <div className="style-guide-swatch-wrap">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="style-guide-swatch-palet"
          style={{ backgroundColor: colorValue.color }}
        ></div>
        {colorValue.name}
      </div>
      {isOpen && (
        <div className="style-guide-color-picker-popup">
          {swatches.map((swatch) => (
            <div
              key={swatch.id}
              className="style-guide-swatch-palet"
              style={{ backgroundColor: swatch.color }}
              onClick={() => {
                handleSwatchClick(swatch.id)
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  )
}
