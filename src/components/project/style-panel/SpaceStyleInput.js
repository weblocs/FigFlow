import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findStyleUnit, deleteUnits } from '../../../utils/style-panel'
import {
  deleteActiveHtmlNodeInlineStyleProperty,
  deleteStyleProperty,
  editStyleProperty,
  setKeyboardNavigationOn,
} from '../../../features/project'
import ModalBackgroundCloser from '../_atoms/ModalBackgroundCloser'
import DragInput from '../_atoms/DragInput'

function SpaceStyleInput(props) {
  const isPropertyInStyleHierarchy = useSelector(
    (state) =>
      state.project.objectHierarchyStyles?.find(
        ({ style }) => style === props.style
      ) !== undefined
  )

  const doesStylePropertyBelongToActiveClass = useSelector(
    (state) =>
      state.project.objectHierarchyStyles?.findLast(
        ({ style }) => style === props.style
      )?.isActive === true
  )
  // const doesStylePropertyBelongToActiveClass = useSelector((state) => (state.project.activeStyleObject?.[props.style] !== undefined));

  // const editedStyleValue = useSelector((state) => deleteUnits(state.project.activeStyleObject?.[props.style]) || !isPropertyInStyleHierarchy && props?.placeholder || deleteUnits(state.project.activeNodeComputedStyles?.[props.style.replace("-","_")]));
  // const editedStyleUnit = useSelector((state) => findStyleUnit(state.project.activeStyleObject?.[props.style]) || (!isPropertyInStyleHierarchy && props?.placeholder) && "-" || findStyleUnit(state.project.activeNodeComputedStyles?.[props.style.replace("-","_")]) );

  const isShiftPressed = useSelector((state) => state.project.isShiftPressed)
  const isKeyAPressed = useSelector((state) => state.project.isKeyAPressed)

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

  const doesStylePropertyIsInline = useSelector(
    (state) =>
      state.project.activeNodeObject?.styles?.[
        state.project.activeProjectResolutionStylesListName
      ]?.[props.style] !== undefined
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

  function handleSetAuto() {
    dispatch(editStyleProperty([props.style, 'auto']))
    setUnitEditorOpened(false)
  }

  function handleReset() {
    if (doesStylePropertyIsInline) {
      dispatch(deleteActiveHtmlNodeInlineStyleProperty(props.style))
    } else {
      dispatch(deleteStyleProperty(props.style))
    }

    setUnitEditorOpened(false)
  }

  function handleInputChange(value) {
    if (value !== editedStyleValue) {
      if (editedStyleUnit === '' || editedStyleUnit === '-') {
        dispatch(editStyleProperty([props.style, parseInt(value) + 'px']))
      } else {
        dispatch(
          editStyleProperty([props.style, parseInt(value) + editedStyleUnit])
        )
      }
    }
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

  useEffect(() => {
    function updateProperty(property) {
      dispatch(
        editStyleProperty([property, editedStyleValue + editedStyleUnit])
      )
    }

    function updateAllMargins() {
      updateProperty('margin-top')
      updateProperty('margin-bottom')
      updateProperty('margin-left')
      updateProperty('margin-right')
    }

    function updateAllPaddings() {
      updateProperty('padding-top')
      updateProperty('padding-bottom')
      updateProperty('padding-left')
      updateProperty('padding-right')
    }

    const style = props.style
    if (isShiftPressed) {
      style === 'padding-top' && updateProperty('padding-bottom')
      style === 'padding-bottom' && updateProperty('padding-top')
      style === 'padding-left' && updateProperty('padding-right')
      style === 'padding-right' && updateProperty('padding-left')
      style === 'margin-top' && updateProperty('margin-bottom')
      style === 'margin-bottom' && updateProperty('margin-top')
      style === 'margin-left' && updateProperty('margin-right')
      style === 'margin-right' && updateProperty('margin-left')
    }
    if (isKeyAPressed) {
      if (
        style === 'padding-top' ||
        style === 'padding-bottom' ||
        style === 'padding-left' ||
        style === 'padding-right'
      ) {
        updateAllPaddings()
      }
      if (
        style === 'margin-top' ||
        style === 'margin-bottom' ||
        style === 'margin-left' ||
        style === 'margin-right'
      ) {
        updateAllMargins()
      }
    }
  }, [editedStyleValue])

  return (
    <div
      className={
        'style-edit-input simple' +
        (doesStylePropertyIsInline ? ' active-inline' : '') +
        (isPropertyInStyleHierarchy ? ' active-in-hierarchy' : '') +
        (doesStylePropertyBelongToActiveClass ? ' active' : '')
      }
    >
      <DragInput
        defaultValue={editedStyleValue}
        handleChange={handleInputChange}
      />
      <div className="style-edit-value">
        <span
          onClick={() => setIsInputActive(true)}
          className={'style-edit-text' + (isInputActive ? ' active' : '')}
        >
          {editedStyleValue}
        </span>
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
        className={'style-edit-unit-list' + (unitEditorOpened ? ' active' : '')}
      >
        <div
          className={
            'style-edit-unit-item' + (editedStyleUnit === 'px' ? ' active' : '')
          }
          onClick={() => handleUnitItemClick('px')}
        >
          px
        </div>
        <div
          className={
            'style-edit-unit-item' + (editedStyleUnit === '%' ? ' active' : '')
          }
          onClick={() => handleUnitItemClick('%')}
        >
          %
        </div>
        <div
          className={
            'style-edit-unit-item' + (editedStyleUnit === 'em' ? ' active' : '')
          }
          onClick={() => handleUnitItemClick('em')}
        >
          em
        </div>
        <div className={'style-edit-unit-item'} onClick={handleSetAuto}>
          auto
        </div>
        <div className={'style-edit-unit-item'} onClick={handleReset}>
          reset
        </div>
      </div>
    </div>
  )
}

export default SpaceStyleInput
// export default React.memo(SpaceStyleInput)
