import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SizeStyleInput from '../style-panel/SizeStyleInput'
import AddStyleGuideStyle from './AddStyleProperty'
import EditStyleGuideItem from './EditItem'
import StyleProperty from './StyleProperty'
import StyleGuideInput from './InputSize'

export default function StyleGuideItem({ folder, item }) {
  const isDeveloperMode = useSelector(
    (state) => state.project.projectMode === 'developer'
  )
  const dispatch = useDispatch()

  const [isHover, setIsHover] = useState(false)

  function handleMouseEnter() {
    setIsHover(true)
  }

  function handleMouseLeave() {
    setIsHover(false)
  }

  return (
    <div key={item.name}>
      <div
        className="style-panel-box title-box space-between item-box"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="text panel-title">{item.name}</div>
        {isDeveloperMode && isHover && (
          <div className="style-guide-buttons">
            <EditStyleGuideItem
              folderId={folder.id}
              id={item.id}
              name={item.name}
            />
            <AddStyleGuideStyle folderId={folder.id} itemId={item.id} />
          </div>
        )}
      </div>

      <div className="style-panel-box">
        <div className="_1-col-style-grid">
          {item.styles?.map((style) => {
            return (
              <StyleProperty
                key={style.name}
                stylePropertyName={style.name}
                text={style.name}
                classId={item.classId}
                optionId={item.optionId}
                optionVersionId={item.optionVersionId}
                folderId={folder.id}
                itemId={item.id}
                propertyId={style.id}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
