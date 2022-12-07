import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddStyleGuideItem from './AddItem'
import EditStyleGuideItem from './EditItem'
import StyleGuideItem from './Item'
import ArrowDown from '../../../img/arrow-down.svg'

export default function StyleGuideFolder({ folder }) {
  const isDeveloperMode = useSelector(
    (state) => state.project.projectMode === 'developer'
  )
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)
  const [isHover, setIsHover] = useState(false)

  function handleArrowClick() {
    setIsOpen(!isOpen)
  }

  function handleMouseEnter() {
    setIsHover(true)
  }

  function handleMouseLeave() {
    setIsHover(false)
  }

  return (
    <div>
      <div
        className="style-panel-box title-box space-between folder-box"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="click-area" onClick={handleArrowClick}></div>
        <div className="text panel-title cursor-pointer">{folder.name}</div>

        <div className="style-guide-buttons">
          {isDeveloperMode && isHover && (
            <>
              <EditStyleGuideItem id={folder.id} name={folder.name} />
              <AddStyleGuideItem
                id={folder.id}
                handleOpen={() => setIsOpen(true)}
              />
            </>
          )}
          <img
            onClick={handleArrowClick}
            className="style-guide-arrow-down"
            style={{ transform: isOpen ? 'rotate(180deg)' : '' }}
            src={ArrowDown}
            alt="arrow down"
          />
        </div>
      </div>
      {isOpen &&
        folder.items?.map((item) => (
          <StyleGuideItem folder={folder} item={item} key={item.id} />
        ))}
    </div>
  )
}
