import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addStyleGuideItemStyle,
  setKeyboardNavigationOn,
} from '../../../features/project'
import addIcon from '../../../img/plus.svg'

export default function AddStyleGuideStyle({ folderId, itemId }) {
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)

  const properties = [
    'background-color',
    'border-color',
    'border-radius',
    'border-width',
    'color',
    'display',
    'font-family',
    'font-weight',
    'font-size',

    'grid-column-gap',

    'line-height',
    'letter-spacing',
    'text-align',

    'margin-top',
    'margin-bottom',
    'margin-left',
    'margin-right',

    'padding-top',
    'padding-bottom',
    'padding-left',
    'padding-right',

    'width',
    'min-width',
    'max-width',
    'height',
    'min-height',
    'max-height',

    'object-fit',
    'position',
    'top',
    'bottom',
    'left',
    'right',

    'opacity',
  ]

  const inputRef = useRef()

  function handlePropertyClick(property) {
    dispatch(addStyleGuideItemStyle({ folderId, itemId, name: property }))
    setIsOpen(false)
  }

  function handleClick() {
    setIsOpen(!isOpen)
  }

  function handleFocus() {
    dispatch(setKeyboardNavigationOn(false))
  }

  function handleBlur() {
    dispatch(setKeyboardNavigationOn(true))
  }

  return (
    <div className="style-guide-add-folder_wrap">
      <button className="settings-list-add-button" onClick={handleClick}>
        <img className="settings-list-add-icon" src={addIcon} />
      </button>

      {isOpen && (
        <div className="style-guide-add-folder_form">
          {properties.map((property) => (
            <div key={property} onClick={() => handlePropertyClick(property)}>
              {property}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
