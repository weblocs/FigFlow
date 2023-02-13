import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editStyleProperty } from '../../../features/project'
import ProprtyInputLabel from './ProprtyInputLabel'
import ShodowStyleInput from './ShodowStyleInput'
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
    if (hierarchyStyleProperty !== undefined) {
      const [_x, _y, _blur, _spread] = hierarchyStyleProperty.split(' ')
      const _color = hierarchyStyleProperty
        .replace(_x, '')
        .replace(_y, '')
        .replace(_blur, '')
        .replace(_spread, '')
        .replace('   ', '')
      if (parseInt(_x) !== x) {
        setX(parseInt(_x))
      }
      if (parseInt(_y) !== y) {
        setY(parseInt(_y))
      }
      if (parseInt(_blur) !== blur) {
        setBlur(parseInt(_blur))
      }
      if (parseInt(_spread) !== spread) {
        setSpread(parseInt(_spread))
      }
      if (parseInt(_color) !== color) {
        setColor(_color)
      }
    } else {
      setX(0)
      setY(0)
      setBlur(0)
      setSpread(0)
      setColor('')
    }
  }, [hierarchyStyleProperty])

  function handleX(value) {
    setX(value)
    updateShadow()
  }

  function handleY(value) {
    setY(value)
    updateShadow()
  }

  function handleBlur(value) {
    setBlur(value)
    updateShadow()
  }

  function handleSpread(value) {
    setSpread(value)
    updateShadow()
  }

  function handleColor(value) {
    setColor(value)
    updateShadow()
  }

  function updateShadow() {
    if (isAnyNodeSelected) {
      dispatch(
        editStyleProperty([
          'box-shadow',
          `${x}px ${y}px ${blur}px ${spread}px ${color}`,
        ])
      )
    }
  }

  return (
    <div className="style-panel-box">
      <ProprtyInputLabel text="Shadow" property="box-shadow" />
      <div style={{ height: '10px' }}></div>
      <div className="_2-col-style-grid">
        <ShodowStyleInput
          name="Horizontal"
          unit="px"
          value={x}
          handleChange={handleX}
        />
        <ShodowStyleInput
          name="Vertical"
          unit="px"
          value={y}
          handleChange={handleY}
        />
        <ShodowStyleInput
          name="Blur"
          unit="px"
          value={blur}
          handleChange={handleBlur}
        />
        <ShodowStyleInput
          name="Spread"
          unit="px"
          value={spread}
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
