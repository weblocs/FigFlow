import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddStyleGuideItem from './AddStyleGuideItem'
import EditStyleGuideItem from './EditStyleGuideItem'
import StyleGuideItem from './StyleGuideItem'
import ArrowDown from '../img/arrow-down.svg'

export default function StyleGuideFolder({ folder }) {
  const isDeveloperMode = useSelector(
    (state) => state.project.projectMode === 'developer'
  )
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)

  function handleArrowClick() {
    setIsOpen(!isOpen)
  }

  return (
    <div key={folder.name}>
      <div className="style-panel-box title-box space-between folder-box">
        <div
          onClick={handleArrowClick}
          className="text panel-title cursor-pointer"
        >
          {folder.name}
        </div>

        <div className="style-guide-buttons">
          {isDeveloperMode && (
            <>
              <EditStyleGuideItem id={folder.id} name={folder.name} />
              <AddStyleGuideItem id={folder.id} />
            </>
          )}
          <div onClick={handleArrowClick}>
            <img
              className="style-guide-arrow-down"
              src={ArrowDown}
              alt="arrow down"
            />
          </div>
        </div>
      </div>
      {isOpen &&
        folder.items?.map((item) => (
          <StyleGuideItem folder={folder} item={item} key={item.id} />
        ))}
    </div>
  )
}
