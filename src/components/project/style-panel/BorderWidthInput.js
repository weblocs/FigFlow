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

export default function BorderWidthInput(props) {
  const cssValue = useSelector((state) => {
    state.project.objectHierarchyStyles?.findLast(
      ({ style }) => style === props.style
    )?.value
  })

  const isCssValueWithSpaces = useSelector((state) => {
    cssValue?.includes(' ') !== undefined
  })

  const cssValueArray = useSelector((state) => {
    cssValue?.split(' ')
  })

  const hierarchyStyleProperty = useSelector((state) => {
    const cssValue = state.project.objectHierarchyStyles?.findLast(
      ({ style }) => style === props.style
    )?.value

    if (props.activeTab === 'center') {
      return cssValue
    }

    const cssValueArray = cssValue?.split(' ')

    console.log(cssValue)

    if (!isCssValueWithSpaces) {
      return cssValue
    }
    if (props.activeTab === 'top') {
      return cssValueArray[0]
    }
    if (props.activeTab === 'right') {
      return cssValueArray[1]
    }
    if (props.activeTab === 'bottom') {
      return cssValueArray[2]
    }
    if (props.activeTab === 'left') {
      return cssValueArray[3]
    }
  })

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
    console.log('1')
    let unit = editedStyleUnit
    if (e.key === 'Enter' && (unit === '' || unit === '-')) {
      unit = 'px'
    }
    console.log(props.activeTab)
    if (props.activeTab === 'center') {
      dispatch(editStyleProperty([props.style, e.target.value + unit]))
    } else if (props.activeTab === 'top') {
      console.log('2')

      let value = ''
      if (isCssValueWithSpaces) {
        value =
          e.target.value +
          unit +
          ' ' +
          cssValueArray[1] +
          ' ' +
          cssValueArray[2] +
          ' ' +
          cssValueArray[3]
      } else {
        console.log(hierarchyStyleProperty)
        value = e.target.value + unit + ' ' + '0' + ' ' + '0' + ' ' + '0'
      }

      console.log('value: ' + value)
      dispatch(editStyleProperty([props.style, value]))
    }
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

  function handleDragChange(value) {
    if (value !== editedStyleValue) {
      dispatch(
        editStylePropertyDrag([
          props.style,
          parseFloat(value) + editedStyleUnit,
        ])
      )
    }
  }

  function handleDragStart() {
    setIsDragged(true)
  }

  function handleDragEnd(value) {
    setIsDragged(false)
    dispatch(
      editStyleProperty([props.style, parseFloat(value) + editedStyleUnit])
    )
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
