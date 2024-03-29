import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findStyleUnit, deleteUnits } from '../../../utils/style-panel'
import {
  editStyleProperty,
  editStylePropertyDrag,
  setKeyboardNavigationOn,
} from '../../../features/project'
import ProprtyInputLabel from './ProprtyInputLabel'
import ModalBackgroundCloser from '../_atoms/ModalBackgroundCloser'
import DragInput from '../_atoms/DragInput'
import SizeStyleInputProperties from './SizeStyleInputProperties'

export default function SizeStyleInput(props) {
  const hierarchyStyleProperty = useSelector(
    (state) =>
      state.project.objectHierarchyStyles?.findLast(
        ({ style }) => style === props.style
      )?.value
  )

  const editedStyleValue = useSelector(
    (state) =>
      deleteUnits(hierarchyStyleProperty) ||
      props?.placeholder ||
      deleteUnits(
        state.project.activeNodeComputedStyles?.[
          props.style.replaceAll('-', '_')
        ]
      )
  )
  const editedStyleUnit = useSelector(
    (state) =>
      findStyleUnit(hierarchyStyleProperty) ||
      (props?.placeholder && '-') ||
      findStyleUnit(
        state.project.activeNodeComputedStyles?.[
          props.style.replaceAll('-', '_')
        ]
      )
  )

  const dispatch = useDispatch()
  const inputRef = useRef()

  const [isInputActive, setIsInputActive] = useState(false)
  const [unitEditorOpened, setUnitEditorOpened] = useState(false)
  const [isDragged, setIsDragged] = useState(false)

  function setProperty(e) {
    let unit = editedStyleUnit
    let value = e.target.value

    function replaceUnit(_unit) {
      if (value.includes(_unit)) {
        value = value.replace(_unit, '')
        unit = _unit
      }
    }

    replaceUnit('px')
    replaceUnit('%')
    replaceUnit('em')
    replaceUnit('rem')
    replaceUnit('vh')
    replaceUnit('vw')

    if (unit === '' || unit === '-') {
      unit = 'px'
    }
    dispatch(editStyleProperty([props.style, value + unit]))
    inputRef.current.value = value
  }

  function handleKeyPress(e) {
    if (e.key === 'ArrowUp') {
      inputRef.current.value = parseInt(editedStyleValue) + 1
    }
    if (e.key === 'ArrowDown') {
      inputRef.current.value = parseInt(editedStyleValue) - 1
    }
    if (e.key === 'Enter' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      setProperty(e)
    }
  }

  function handleUnitItemClick(unit) {
    dispatch(editStyleProperty([props.style, editedStyleValue + unit]))
    setUnitEditorOpened(false)
  }

  useEffect(() => {
    if (isInputActive === true) {
      inputRef.current.focus()
      if (editedStyleValue === undefined) {
        inputRef.current.value = ''
      } else {
        inputRef.current.value = editedStyleValue
      }
      dispatch(setKeyboardNavigationOn(false))
    } else {
      dispatch(setKeyboardNavigationOn(true))
    }
  }, [isInputActive])

  function handleDragChange(value) {
    let unit = editedStyleUnit
    if (unit === '' || unit === '-') {
      unit = 'px'
    }
    if (value !== editedStyleValue) {
      dispatch(editStylePropertyDrag([props.style, parseFloat(value) + unit]))
    }
  }

  function handleDragStart() {
    setIsDragged(true)
  }

  function handleDragEnd(value) {
    setIsDragged(false)
    let unit = editedStyleUnit
    if (unit === '' || unit === '-') {
      unit = 'px'
    }
    dispatch(editStyleProperty([props.style, parseFloat(value) + unit]))
  }

  return (
    <div className="size-style-box">
      <ProprtyInputLabel text={props.text} property={props.style} />

      <div className="style-edit-input">
        <div className="style-edit-value">
          <span
            onClick={() => setIsInputActive(true)}
            className={
              'style-edit-text' +
              (isInputActive ? ' active' : '') +
              (isDragged ? ' drag' : '')
            }
          >
            {editedStyleValue}
          </span>

          <DragInput
            defaultValue={editedStyleValue}
            handleChange={(event) => handleDragChange(event)}
            handleStart={() => handleDragStart()}
            handleEnd={(event) => handleDragEnd(event)}
          />

          <input
            className={
              'style-edit-input-text' + (!isInputActive ? ' active' : '')
            }
            type="text"
            ref={inputRef}
            onBlur={() => setIsInputActive(false)}
            onKeyDown={handleKeyPress}
          />
        </div>
        <div
          className="style-edit-unit"
          onClick={() => setUnitEditorOpened(true)}
        >
          {editedStyleUnit}
        </div>

        <ModalBackgroundCloser
          handleClick={() => setUnitEditorOpened(false)}
          isActiveIf={unitEditorOpened}
        />

        <SizeStyleInputProperties
          isOpen={unitEditorOpened}
          handleUnitClick={handleUnitItemClick}
          activeUnit={editedStyleUnit}
        />
      </div>
    </div>
  )
}
