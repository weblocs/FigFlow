import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProjectImages } from '../../../../features/project-images'
import {
  setPages,
  setCollections,
  setStyles,
  setSymbols,
  setSwatches,
  setPageFolders,
  setPagesNestedStructure,
  setBlocks,
  setLayouts,
  setStyleGuide,
  setScripts,
  setLibraries,
} from '../../../../features/project'
import DotsIcon from '../../../../img/dots-vertical.svg'

export default function BackupListItem({ backup }) {
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const dispatch = useDispatch()

  const [itemHovered, setItemHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  function mouseLeave() {
    setItemHovered(false)
    setIsOpen(false)
  }

  function restore(data) {
    dispatch(setPages([...data.pages]))
    dispatch(setCollections([...data.collections]))
    dispatch(setStyles([...data.preRenderedStyles]))
    dispatch(setSymbols([...data?.symbols]))
    dispatch(setSwatches([...data?.swatches]))
    dispatch(setPageFolders([...data?.projectPageFolders]))
    dispatch(setPagesNestedStructure([...data.projectPageFolderStructure]))
    dispatch(setBlocks([...data.blocks]))
    dispatch(setLayouts([...data.sections]))
    dispatch(setStyleGuide([...data?.styleGuide]))
    dispatch(setScripts([...data?.scripts]))
    dispatch(setLibraries([...data?.libraries]))
  }

  return (
    <div
      className="projectPageItem "
      onMouseEnter={() => setItemHovered(true)}
      onMouseLeave={mouseLeave}
      // onClick={() => console.log(backup.data)}
    >
      {backup.name} | {backup.date}
      <img
        src={DotsIcon}
        className={'page-item_settings-icon' + (itemHovered ? ' active' : '')}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="backup-item_actions-list">
          <a
            className="backup-item_actions-item"
            target="_blank"
            href={'?backup=' + backup.id}
          >
            Preview backup
          </a>
          <div
            className="backup-item_actions-item"
            onClick={() => restore(backup.data)}
          >
            Restore backup
          </div>
        </div>
      )}
    </div>
  )
}
