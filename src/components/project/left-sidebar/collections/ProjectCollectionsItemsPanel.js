import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setActiveCollectionItem,
  addCollectionItem,
  setCollectionPanelState,
} from '../../../../features/project'
import CreateNewItemInput from '../navigator/CreateNewItemInput'
import Arrow from '../../../../img/arrow-left.svg'
import { activeCollectionSelector } from '../../../../selectors/active-collection'
import AddButton from '../_atoms/AddButton'
import SidePanel from '../../../ui/SidePanel'

export default function ProjectCollectionsItemsPanel() {
  const isTabActive = useSelector(
    (state) =>
      state.project.activeTab === 'Collections' &&
      (state.project.collectionPanelState === 'items' ||
        state.project.collectionPanelState === 'fields')
  )
  const activeCollection = useSelector((state) =>
    activeCollectionSelector(state)
  )
  const activeCollectionItemId = useSelector(
    (state) => state.project.activeCollectionItemId
  )

  const dispatch = useDispatch()

  const [createInputVisible, setCreateInputVisible] = useState(false)

  function handleItemClick(id) {
    dispatch(setActiveCollectionItem(id))
    dispatch(setCollectionPanelState('fields'))
  }

  return (
    <SidePanel isActive={isTabActive}>
      <div className="side-panel-title">
        <div>
          <span
            className="panel_back-button"
            onClick={() => dispatch(setCollectionPanelState('collections'))}
          >
            <img src={Arrow} />
          </span>
          {activeCollection?.name} Items
        </div>
        <div className="projectTabTitleButtonsBox">
          <AddButton fx={() => setCreateInputVisible(!createInputVisible)} />
        </div>
      </div>

      <CreateNewItemInput
        visibility={createInputVisible}
        setVisibility={setCreateInputVisible}
        create={addCollectionItem}
        placeholder="New item"
      />

      <div className="pagesList">
        {activeCollection?.items.map((item) => (
          <div
            onClick={() => handleItemClick(item.id)}
            className={
              'projectPageItem' +
              (activeCollectionItemId === item.id ? ' active' : '') +
              (item?.archived !== undefined && item?.archived !== false
                ? ' archived'
                : '')
            }
            key={item.id}
          >
            {item.name}
          </div>
        ))}
      </div>
    </SidePanel>
  )
}
