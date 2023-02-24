import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCollectionPanelState } from '../../../../features/project'
import Arrow from '../../../../img/arrow-left.svg'
import { activeCollectionItemSelector } from '../../../../selectors/active-collection'
import SidePanel from '../../../ui/SidePanel'
import Editor from '../../editor/Editor'
import RichTextEditor from '../../rich-text-editor/Editor'
import CollectionFieldsList from './CollectionFieldsList'
import ItemActionButtons from './ItemActionButtons'

export default function ProjectCollectionsFieldsPanel() {
  const isActiveTab = useSelector(
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
      <SidePanel isActive={isActiveTab} width={600} isFieldPanel={true}>
        <div className="side-panel-title">
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
      </SidePanel>
    )
  }
}
