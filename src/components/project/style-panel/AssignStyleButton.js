import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  assignInlineStylePropertyToClass,
  editStyleProperty,
} from '../../../features/project'

export default function AssignStyleButton({ styleProperty, styleValue }) {
  const stylesInActiveNode = useSelector(
    (state) => state.project.stylesInActiveNode
  )

  const dispatch = useDispatch()

  function assignStyle(id) {
    dispatch(
      assignInlineStylePropertyToClass({
        styleProperty,
        styleId: getPrimaryStyle(id),
        optionVersionId: getStyleOption(id),
      })
    )
  }

  function isStylePrimary(id) {
    return id === stylesInActiveNode?.[0].id
  }

  function getPrimaryStyle(id) {
    if (isStylePrimary(id)) {
      return id
    } else {
      return stylesInActiveNode?.[0].id
    }
  }

  function getStyleOption(id) {
    if (isStylePrimary(id)) {
      return undefined
    } else {
      return id
    }
  }

  return (
    <div className={'style-property-info-text active'}>
      <div className="assign-to-title">Assign to</div>
      <div className="asigned-classes-list">
        {stylesInActiveNode
          .filter((style) => style.id !== '')
          ?.map((style) => (
            <div
              onClick={() => assignStyle(style.id)}
              key={style.id}
              className="assign-to-button"
            >
              {style.name}
            </div>
          ))}
      </div>
    </div>
  )
}
