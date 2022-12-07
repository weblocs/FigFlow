import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findStyleUnit, deleteUnits } from '../../../utils/style-panel'
import {
  editStyleProperty,
  setKeyboardNavigationOn,
} from '../../../features/project'
import ProprtyInputLabel from './ProprtyInputLabel'
import ModalBackgroundCloser from '../_atoms/ModalBackgroundCloser'
import DragInput from '../_atoms/DragInput'

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

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      if (editedStyleUnit === '' || editedStyleUnit === '-') {
        dispatch(editStyleProperty([props.style, e.target.value + 'px']))
      } else {
        dispatch(
          editStyleProperty([props.style, e.target.value + editedStyleUnit])
        )
      }
      setIsInputActive(false)

      if (props.style === 'border-width') {
        dispatch(editStyleProperty(['border-style', 'solid']))
      }
    }
    if (e.key === 'ArrowUp') {
      inputRef.current.value = parseInt(editedStyleValue) + 1
      dispatch(
        editStyleProperty([
          props.style,
          parseInt(e.target.value) + editedStyleUnit,
        ])
      )
    }
    if (e.key === 'ArrowDown') {
      inputRef.current.value = parseInt(editedStyleValue) - 1
      dispatch(
        editStyleProperty([
          props.style,
          parseInt(e.target.value) + editedStyleUnit,
        ])
      )
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

  function handleInputChange(value) {
    if (value !== editedStyleValue) {
      if (editedStyleUnit === '' || editedStyleUnit === '-') {
        dispatch(editStyleProperty([props.style, parseFloat(value) + 'px']))
      } else {
        dispatch(
          editStyleProperty([props.style, parseFloat(value) + editedStyleUnit])
        )
      }
    }
  }

  return (
    <div className="size-style-box">
      <ProprtyInputLabel text={props.text} property={props.style} />

      <div className="style-edit-input">
        <div className="style-edit-value">
          <span
            onClick={() => setIsInputActive(true)}
            className={'style-edit-text' + (isInputActive ? ' active' : '')}
          >
            {editedStyleValue}
          </span>
          <DragInput
            defaultValue={editedStyleValue}
            handleChange={(event) => handleInputChange(event)}
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

        <div
          className={
            'style-edit-unit-list' + (unitEditorOpened ? ' active' : '')
          }
        >
          <div
            className={
              'style-edit-unit-item' +
              (editedStyleUnit === 'px' ? ' active' : '')
            }
            onClick={() => handleUnitItemClick('px')}
          >
            px
          </div>
          <div
            className={
              'style-edit-unit-item' +
              (editedStyleUnit === '%' ? ' active' : '')
            }
            onClick={() => handleUnitItemClick('%')}
          >
            %
          </div>
          <div
            className={
              'style-edit-unit-item' +
              (editedStyleUnit === 'em' ? ' active' : '')
            }
            onClick={() => handleUnitItemClick('em')}
          >
            em
          </div>
        </div>
      </div>
    </div>
  )
}
