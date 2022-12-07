import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteStyleGuideItemStyle,
  deleteStylePropertyInDefinedStyle,
} from '../../../features/project'

export default function StylePropertyName({
  classId,
  optionId,
  optionVersionId,
  stylePropertyName,
  folderId,
  itemId,
  propertyId,
}) {
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)

  const handleReset = () => {
    dispatch(
      deleteStylePropertyInDefinedStyle({
        styleId: classId,
        optionId,
        optionVersionId,
        property: stylePropertyName,
      })
    )
    setIsOpen(false)
  }

  const handleRemove = () => {
    dispatch(
      deleteStyleGuideItemStyle({
        folderId,
        itemId,
        propertyId,
      })
    )
    setIsOpen(false)
  }

  const handleNameClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="style-guide-property-name-wrap">
      <div className="style-guide-property-name" onClick={handleNameClick}>
        {stylePropertyName.replaceAll('-', ' ')}
      </div>
      {isOpen && (
        <div className="style-guide-property-actions-wrap">
          <div className="style-guide-property-action" onClick={handleReset}>
            Reset
          </div>
          <div className="style-guide-property-action" onClick={handleRemove}>
            Remove
          </div>
        </div>
      )}
    </div>
  )
}
