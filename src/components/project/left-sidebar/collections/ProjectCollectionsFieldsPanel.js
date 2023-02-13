import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCollectionPanelState } from '../../../../features/project'
import Arrow from '../../../../img/arrow-left.svg'
import { activeCollectionItemSelector } from '../../../../selectors/active-collection'
import Editor from '../../editor/Editor'
import RichTextEditor from '../../rich-text-editor/Editor'
import CollectionFieldsList from './CollectionFieldsList'
import ItemActionButtons from './ItemActionButtons'

export default function ProjectCollectionsFieldsPanel() {
  const isActiveTabCollections = useSelector(
    (state) => state.project.activeTab === 'Collections'
  )
  const isCollectionPanelStateFields = useSelector(
    (state) => state.project.collectionPanelState === 'fields'
  )
  const activeCollectionItemName = useSelector(
    (state) => activeCollectionItemSelector(state)?.name
  )
  const dispatch = useDispatch()

  if (isCollectionPanelStateFields) {
    return (
      <div
        className={
          'collectionsPanel item-edit-panel ' +
          (isActiveTabCollections ? 'active' : '')
        }
      >
        <div className="projectTabTitleBox">
          <div>
            <span
              className="panel_back-button"
              onClick={() => dispatch(setCollectionPanelState('items'))}
            >
              <img src={Arrow} />
            </span>
            {activeCollectionItemName}
          </div>
        </div>

        <div className="pagesList">
          <CollectionFieldsList />
        </div>

        <ItemActionButtons />
      </div>
    )
  }
}
