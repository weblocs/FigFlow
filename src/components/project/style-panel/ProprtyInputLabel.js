import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteActiveHtmlNodeInlineStyleProperty,
  deleteStyleProperty,
} from '../../../features/project'
import { getResolutionName } from '../../../utils/nodes-editing'
import AssignStyleButton from './AssignStyleButton'

export default function ProprtyInputLabel({ text, property }) {
  const objectHierarchyStyles = useSelector((state) =>
    state.project.objectHierarchyStyles?.findLast(
      ({ style }) => style === property
    )
  )

  const doesStylePropertyBelongToActiveClass = useSelector(
    (state) => objectHierarchyStyles?.isActive === true
  )

  const isPropertyInStyleHierarchy = useSelector(
    (state) => objectHierarchyStyles !== undefined
  )

  const isStylePropertyInline = useSelector(
    (state) => objectHierarchyStyles?.isInline === true
  )

  const isStylePropertyFromActiveResolution = useSelector(
    (state) =>
      objectHierarchyStyles?.resolution ===
      state.project.activeProjectResolution
  )

  const styleState = useSelector((state) => state.project.styleState)

  const isStylePropertyFromActiveState = useSelector(
    (state) => objectHierarchyStyles?.state === state.project.styleState
  )

  const dispatch = useDispatch()

  const [isInfoOpen, setIsInfoOpen] = useState(false)

  function handleClick() {
    if (
      isPropertyInStyleHierarchy ||
      isStylePropertyInline ||
      doesStylePropertyBelongToActiveClass
    ) {
      setIsInfoOpen(true)
    }
  }

  function handlePropertyReset() {
    if (isStylePropertyInline) {
      dispatch(deleteActiveHtmlNodeInlineStyleProperty(property))
    } else if (doesStylePropertyBelongToActiveClass) {
      dispatch(deleteStyleProperty(property))
    }
    setIsInfoOpen(false)
  }

  return (
    <div
      className={
        'style-title-box' +
        (doesStylePropertyBelongToActiveClass ? ' active' : '') +
        (isStylePropertyInline &&
        isStylePropertyFromActiveResolution &&
        isStylePropertyFromActiveState
          ? ' isInline'
          : '') +
        (isPropertyInStyleHierarchy ? ' isInHierarchy' : '')
      }
    >
      <div className="text" onClick={handleClick}>
        {text}
      </div>
      <div
        onClick={() => setIsInfoOpen(false)}
        className={'style-property-info_closer' + (isInfoOpen ? ' active' : '')}
      ></div>

      <div className={'style-property-info' + (isInfoOpen ? ' active' : '')}>
        <div
          className={
            'reset-button' +
            ((isStylePropertyInline &&
              isStylePropertyFromActiveResolution &&
              isStylePropertyFromActiveState) ||
            doesStylePropertyBelongToActiveClass
              ? ' active'
              : '')
          }
          onClick={handlePropertyReset}
        >
          Reset
        </div>

        <div
          className={
            'style-property-info-text' +
            (isStylePropertyInline ? ' active' : '')
          }
        >
          Inline property
        </div>

        <div
          className={
            'style-property-info-text' +
            (objectHierarchyStyles?.origin !== '' ? ' active' : '')
          }
        >
          Class: {objectHierarchyStyles?.origin}
        </div>
        <div
          className={
            'style-property-info-text' +
            (objectHierarchyStyles?.option !== '' ? ' active' : '')
          }
        >
          Option: {objectHierarchyStyles?.option}
        </div>
        <div
          className={
            'style-property-info-text' +
            (objectHierarchyStyles?.resolution !== '' ? ' active' : '')
          }
        >
          Resolution: {getResolutionName(objectHierarchyStyles?.resolution)}
        </div>
        <div className={'style-property-info-text active'}>
          State: <span>{objectHierarchyStyles?.state}</span>
        </div>

        {isStylePropertyInline &&
          isStylePropertyFromActiveResolution &&
          isStylePropertyFromActiveState && (
            <AssignStyleButton styleProperty={property} />
          )}
      </div>
    </div>
  )
}
