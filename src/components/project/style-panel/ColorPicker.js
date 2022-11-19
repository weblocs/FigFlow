import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  editSwatch,
  addSwatch,
  setKeyboardNavigationOn,
  editStyleProperty,
  handleArrowNodesNavigation,
} from '../../../features/project'
import ModalBackgroundCloser from '../_atoms/ModalBackgroundCloser'
import ProprtyInputLabel from './ProprtyInputLabel'
import { ChromePicker } from 'react-color'

export default function ColorPicker(props) {
  const projectSwatches = useSelector((state) => state.project.projectSwatches)
  // const editedStyleValue = useSelector((state) => state.project.activeStyleObject?.[props.style] || state.project.activeNodeComputedStyles?.[props.style.replace("-","_")]);

  const hierarchyStyleProperty = useSelector(
    (state) =>
      state.project.objectHierarchyStyles?.findLast(
        ({ style }) => style === props.style
      )?.value
  )

  const editedStyleValue = useSelector(
    (state) =>
      hierarchyStyleProperty ||
      state.project.activeNodeComputedStyles?.[props.style.replaceAll('-', '_')]
  )

  const activeSwatchName = useSelector((state) => {
    return
  })

  const dispatch = useDispatch()

  const [activeSwatch, setActiveSwatch] = useState({})
  const [swatchEditorMode, setSwatchEditorMode] = useState('')
  const [swatchesEditorOpened, setSwatchesEditorOpened] = useState(false)
  const [formButtonText, setFormButtonText] = useState('Save')
  const [activeSwatchNameOrColorValue, setActiveSwatchNameOrColorValue] =
    useState('')
  const [styleColorInputOpen, setStyleColorInputOpen] = useState(false)

  const styleColorRef = useRef()
  const swatchNameRef = useRef()
  const swatchColorRef = useRef()

  useEffect(() => {
    swatchNameRef.current.value = activeSwatch.name
    swatchColorRef.current.value = activeSwatch.color
    dispatch(setKeyboardNavigationOn(!swatchesEditorOpened))
  }, [activeSwatch])

  useEffect(() => {
    setActiveSwatchNameOrColorValue(editedStyleValue)
    projectSwatches.forEach((swatch) => {
      if (swatch.color === editedStyleValue) {
        setActiveSwatchNameOrColorValue(swatch.name)
        setActiveSwatch(swatch)
      }
    })
  }, [editedStyleValue, projectSwatches])

  useEffect(() => {
    if (swatchEditorMode === 'edit') {
      setFormButtonText('Save')
    } else if (swatchEditorMode === 'add') {
      setFormButtonText('Add')
    }
  }, [swatchEditorMode])

  useEffect(() => {
    dispatch(setKeyboardNavigationOn(!styleColorInputOpen))
  }, [styleColorInputOpen])

  function componentToHex(c) {
    var hex = c.toString(16)
    return hex.length == 1 ? '0' + hex : hex
  }

  function rgbToHex(color) {
    return color
    color = color.replace('rgb(', '').replace(')', '')
    const rgbValues = color.split(',')
    const hexColor =
      '#' +
      componentToHex(rgbValues[0]) +
      componentToHex(rgbValues[1]) +
      componentToHex(rgbValues[2])
    return hexColor.replaceAll(' ', '')
  }

  function handleOpeningSwatchesEditor() {
    let tempActiveSwatch = projectSwatches?.find(
      ({ color }) => color === editedStyleValue
    )
    if (tempActiveSwatch !== undefined) {
      setActiveSwatch(tempActiveSwatch)
      setSwatchEditorMode('edit')
    } else {
      setActiveSwatch({ id: '', name: '', color: '' })
    }
    setSwatchesEditorOpened(!swatchesEditorOpened)
  }

  function handleSwatchClick(swatch) {
    setSwatchEditorMode('edit')
    setActiveSwatch(swatch)
    dispatch(editStyleProperty([props.style, swatch.color]))
  }

  function inputOnChange() {
    setActiveSwatch({
      id: activeSwatch.id,
      name: swatchNameRef.current.value,
      color: swatchColorRef.current.value,
    })
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    if (swatchEditorMode === 'edit') {
      dispatch(
        editSwatch({
          id: activeSwatch.id,
          name: swatchNameRef.current.value,
          color: swatchColorRef.current.value,
        })
      )
      setFormButtonText('Saved')
      setTimeout(() => {
        setFormButtonText('Save')
      }, 1000)
    } else if (swatchEditorMode === 'add') {
      dispatch(
        addSwatch({
          name: swatchNameRef.current.value,
          color: swatchColorRef.current.value,
        })
      )
      setSwatchEditorMode('edit')
    }
    dispatch(editStyleProperty([props.style, swatchColorRef.current.value]))
  }

  function handleColorPickerChange(color, event) {
    dispatch(
      editSwatch({
        id: activeSwatch.id,
        name: swatchNameRef.current.value,
        color: color.hex,
      })
    )
    dispatch(editStyleProperty([props.style, color.hex]))
  }

  function handleClickNewSwatchButton() {
    setSwatchEditorMode('add')
    swatchNameRef.current.focus()
    setActiveSwatch({ id: '', name: '', color: editedStyleValue })
  }

  function handleColorTextClick() {
    styleColorRef.current.value = editedStyleValue
    setStyleColorInputOpen(true)
  }

  function handleStyleColorInputBlur() {
    setStyleColorInputOpen(false)
  }

  function handleStyleColorKeyDown(e) {
    if (e.key === 'Enter') {
      dispatch(editStyleProperty([props.style, e.target.value]))
      setStyleColorInputOpen(false)
    }
  }

  return (
    <div className="size-style-box">
      <ModalBackgroundCloser
        handleClick={() => setSwatchesEditorOpened(false)}
        isActiveIf={swatchesEditorOpened}
      />

      <ProprtyInputLabel text="Color" property={props.style} />

      <div className="input color-picker">
        <div
          className="color-picker_color-box"
          style={{ backgroundColor: editedStyleValue }}
          onClick={handleOpeningSwatchesEditor}
        ></div>

        <div
          className={'style-edit-text' + (styleColorInputOpen ? ' active' : '')}
          onClick={handleColorTextClick}
        >
          {activeSwatchNameOrColorValue}
        </div>
        <input
          onBlur={handleStyleColorInputBlur}
          onKeyDown={handleStyleColorKeyDown}
          className={
            'style-edit-input-text color-input' +
            (!styleColorInputOpen ? ' active' : '')
          }
          ref={styleColorRef}
          type="text"
        />

        <form
          className={'swatches-box' + (swatchesEditorOpened ? ' active' : '')}
          onSubmit={handleFormSubmit}
        >
          <div className="swatches-list">
            {projectSwatches.map((swatch) => (
              <div
                className={
                  'swatches-item' +
                  (swatch.id === activeSwatch.id ? ' active' : '')
                }
                style={{ backgroundColor: swatch.color }}
                onClick={() => handleSwatchClick(swatch)}
                key={swatch.id}
              ></div>
            ))}
            <div className="new-swatch" onClick={handleClickNewSwatchButton}>
              +
            </div>
          </div>
          <input
            placeholder="swatch name"
            ref={swatchNameRef}
            onKeyDown={inputOnChange}
            className="input change-swatch-input"
            defaultValue={activeSwatch.name}
          />
          <input
            placeholder="swatch value"
            ref={swatchColorRef}
            onKeyDown={inputOnChange}
            className="input change-swatch-input"
            defaultValue={activeSwatch.color}
          />
          <button className="swatch-save-button">{formButtonText}</button>

          <ChromePicker
            color={editedStyleValue}
            onChange={handleColorPickerChange}
          />
        </form>
      </div>
    </div>
  )
}
