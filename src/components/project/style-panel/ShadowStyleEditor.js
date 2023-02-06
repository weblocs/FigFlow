import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editStyleProperty } from '../../../features/project'
import ColorPickerPopUp from './ColorPickerPopUp'
import ProprtyInputLabel from './ProprtyInputLabel'
import ShodowStyleInput from './ShodowStyleInput'
import SizeStyleInput from './SizeStyleInput'
import SpaceStyleInput from './SpaceStyleInput'
import { ChromePicker } from 'react-color'

export default function ShadowStyleEditor() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [blur, setBlur] = useState(0)
  const [spread, setSpread] = useState(0)
  const [color, setColor] = useState('')

  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useDispatch()

  const isAnyNodeSelected = useSelector(
    (state) => state.project.activeNodeId !== ''
  )
  const hierarchyStyleProperty = useSelector(
    (state) =>
      state.project.objectHierarchyStyles?.findLast(
        ({ style }) => style === 'box-shadow'
      )?.value
  )

  useEffect(() => {
    if (isAnyNodeSelected) {
      console.log(color)
      dispatch(
        editStyleProperty([
          'box-shadow',
          `${x}px ${y}px ${blur}px ${spread}px ${color}`,
        ])
      )

      console.log('style: ' + hierarchyStyleProperty)
    }
  }, [x, y, blur, spread, color])

  return (
    <div className="style-panel-box">
      <ProprtyInputLabel text="Shadow" property="box-shadow" />
      <div style={{ height: '10px' }}></div>
      <div className="_2-col-style-grid">
        <ShodowStyleInput
          name="Horizontal"
          unit="px"
          value={x}
          handleChange={setX}
        />
        <ShodowStyleInput
          name="Vertical"
          unit="px"
          value={y}
          handleChange={setY}
        />
        <ShodowStyleInput
          name="Blur"
          unit="px"
          value={blur}
          handleChange={setBlur}
        />
        <ShodowStyleInput
          name="Spread"
          unit="px"
          value={spread}
          handleChange={setSpread}
        />
      </div>
      <div style={{ height: '8px' }}></div>
      <div className="size-style-box">
        <div className="style-title-box">
          <div className="text">Color</div>
        </div>
        <div
          className="color-picker_color-wrap"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div
            className="color-picker_color-box"
            style={{
              backgroundColor: color,
            }}
          ></div>
          <div className="text">{color}</div>
        </div>

        {isOpen && (
          <div className="swatches-box active">
            <ChromePicker
              color={color}
              onChange={(color) =>
                setColor(
                  `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                )
              }
              // onChangeComplete={handleColorPickerChange}
            />
          </div>
        )}
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="color-picker_popup-closer"
        ></div>
      )}
    </div>
  )
}
