import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ColorPickerPopUp from './ColorPickerPopUp'
import ProprtyInputLabel from './ProprtyInputLabel'

export default function ColorPicker(props) {
  const projectSwatches = useSelector((state) => state.project.projectSwatches)
  const editedStyleValue = useSelector(
    (state) =>
      state.project.activeNodeComputedStyles?.[props.style.replace('-', '_')]
  )

  const hierarchyStyleProperty = useSelector((state) => {
    let value = state.project.objectHierarchyStyles?.findLast(
      ({ style }) => style === props.style
    )?.value

    const isPropertySwatch =
      value?.charAt(0) === '{' && value?.charAt(1) === '{'

    if (isPropertySwatch) {
      value = value.replaceAll('{{', '').replaceAll('}}', '')
      value = projectSwatches.find((swatch) => swatch.id === value)
      return { color: value?.color, name: value?.name, id: value?.id }
    } else {
      return { color: value, name: value, id: '' }
    }
  })

  const preRenderedStyles = useSelector(
    (state) => state.project.preRenderedStyles
  )

  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="size-style-box">
      <ProprtyInputLabel text="Color" property={props.style} />

      <div className="color-picker_color-wrap">
        <div
          className="color-picker_color-box"
          style={{
            backgroundColor: hierarchyStyleProperty.color || editedStyleValue,
          }}
          onClick={() => setIsOpen(!isOpen)}
        ></div>
        <div className="text">
          {hierarchyStyleProperty.name || editedStyleValue}
        </div>

        {isOpen && (
          <ColorPickerPopUp
            style={props.style}
            swatchName={hierarchyStyleProperty.name}
            color={hierarchyStyleProperty.color}
            activeSwatchId={hierarchyStyleProperty.id}
          />
        )}
      </div>
    </div>
  )
}
