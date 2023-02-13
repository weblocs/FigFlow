import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setActivePage,
  openPageSettings,
  togglePageFolderExpandState,
} from '../../../../features/project'
import Arrow from '../../../../img/arrow-down.svg'
import SettingIcon from '../../../../img/setting.svg'

export default function UtilityPageListItem({ node }) {
  const activePageId = useSelector((state) => state.project.activePageId)
  const openedSettingsPage = useSelector(
    (state) => state.project.openedSettingsPage
  )

  const dispatch = useDispatch()

  const [itemHovered, setItemHovered] = useState(false)

  function handleOnClick(node) {
    if (!node?.children) {
      dispatch(setActivePage(node.id))
    } else {
      dispatch(togglePageFolderExpandState(node.id))
    }
  }

  function handleSettingsClick(node) {
    if (openedSettingsPage?.id !== node.id) {
      dispatch(openPageSettings(node))
    } else {
      dispatch(openPageSettings({}))
    }
  }

  return (
    <div
      className="item-wrapper"
      onMouseEnter={() => setItemHovered(true)}
      onMouseLeave={() => setItemHovered(false)}
    >
      <div
        className={
          'projectPageItem ' + (node.id == activePageId ? 'active ' : ' ')
        }
        onClick={() => handleOnClick(node)}
        nodeid={node.id}
        style={{
          paddingLeft: 16 + 'px',
          display: 'flex',
        }}
      >
        {node.children && (
          <span>
            <img
              src={Arrow}
              className={
                'page-item-arrow' + (node?.expanded ? ' expanded' : '')
              }
              style={{ width: '9px', marginTop: '5px', marginRight: '6px' }}
            />
          </span>
        )}
        {node.name}
      </div>

      <img
        src={SettingIcon}
        className={'page-item_settings-icon' + (itemHovered ? ' active' : '')}
        onClick={() => handleSettingsClick(node)}
      />
    </div>
  )
}
