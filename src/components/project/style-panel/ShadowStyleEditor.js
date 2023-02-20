import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editStyleProperty } from '../../../features/project'
import ProprtyInputLabel from './ProprtyInputLabel'
import ShadowStyleInput from './ShadowStyleInput'
import { ChromePicker } from 'react-color'

export default function ShadowStyleEditor() {
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

  const valueX = useSelector((state) =>
    (parseInt(hierarchyStyleProperty?.split(' ')[0]) || '0').toString()
  )
  const valueY = useSelector((state) =>
    (parseInt(hierarchyStyleProperty?.split(' ')[1]) || '0').toString()
  )
  const valueBlur = useSelector((state) =>
    parseInt(hierarchyStyleProperty?.split(' ')[2] || '0').toString()
  )
  const valueSpread = useSelector((state) =>
    parseInt(hierarchyStyleProperty?.split(' ')[3] || '0').toString()
  )
  const valueColor = useSelector((state) =>
    hierarchyStyleProperty
      ?.replace(valueX, '')
      ?.replace(valueY, '')
      ?.replace(valueBlur, '')
      ?.replace(valueSpread, '')
      ?.replace('   ', '')
  )

  function handleX(value) {
    updateShadow(
      `${value}px ${valueY}px ${valueBlur}px ${valueSpread}px ${valueColor}`
    )
  }

  function handleY(value) {
    updateShadow(
      `${valueX}px ${value}px ${valueBlur}px ${valueSpread}px ${valueColor}`
    )
  }

  function handleBlur(value) {
    updateShadow(
      `${valueX}px ${valueY}px ${value}px ${valueSpread}px ${valueColor}`
    )
  }

  function handleSpread(value) {
    updateShadow(
      `${valueX}px ${valueY}px ${valueBlur}px ${value}px ${valueColor}`
    )
  }

  function handleColor(value) {
    updateShadow(
      `${valueX}px ${valueY}px ${valueBlur}px ${valueSpread}px ${value}`
    )
  }

  function updateShadow(shadow) {
    console.log(shadow)
    if (isAnyNodeSelected) {
      dispatch(editStyleProperty(['box-shadow', shadow]))
    }
  }

  return (
    <div className="style-panel-box">
      <ProprtyInputLabel text="Shadow" property="box-shadow" />
      <div style={{ height: '10px' }}></div>
      <div className="_2-col-style-grid">
        <ShadowStyleInput
          name="Horizontal"
          unit="px"
          value={valueX}
          handleChange={handleX}
        />
        <ShadowStyleInput
          name="Vertical"
          unit="px"
          value={valueY}
          handleChange={handleY}
        />
        <ShadowStyleInput
          name="Blur"
          unit="px"
          value={valueBlur}
          handleChange={handleBlur}
        />
        <ShadowStyleInput
          name="Spread"
          unit="px"
          value={valueSpread}
          handleChange={handleSpread}
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
              backgroundColor: valueColor,
            }}
          ></div>
          <div className="text">{valueColor}</div>
        </div>

        {isOpen && (
          <div className="swatches-box active">
            <ChromePicker
              color={valueColor}
              onChange={(color) =>
                handleColor(
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
