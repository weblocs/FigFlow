import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { editHtmlNode } from '../../../features/project'
import CollectionTemplatePageFieldsConnector from './CollectionTemplatePageFieldsConnector'
import NodeRepeatableSettings from './NodeRepeatableSettings'
import StylePanelTitle from '../style-panel/StylePanelTitle'

import ElementsClassChanger from './functions/ElementsClassChanger'
import CollectionFieldsList from '../left-sidebar/collections/CollectionFieldsList'
import CollectionListFieldsConnetor from './CollectionListFieldsConnetor'
import CollectionListCollectionConnector from './CollectionListCollectionConnector'
import OpenElement from './OpenElement'

export default function ProjectSettingsPanel() {
  const dispatch = useDispatch()

  const activeRightSidebarTab = useSelector(
    (state) => state.project.activeRightSidebarTab
  )
  const collections = useSelector((state) => state.project.collections)
  const activeNodeObject = useSelector(
    (state) => state.project.activeNodeObject
  )
  const isProjectModeDeveloper = useSelector(
    (state) => state.project.projectMode === 'developer'
  )
  const isNodeCmsEditable = useSelector(
    (state) =>
      state.project.activeNodeObject?.cmsFieldId !== undefined &&
      state.project.activeNodeObject?.cmsFieldId !== ''
  )

  const isNodeCollection = useSelector((state) => {
    const parentPath = state.project.activeNodeParentsPath
    return parentPath[parentPath.length - 1]?.type === 'col'
  })

  const isNodeInCollection = useSelector((state) => {
    const parentPath = state.project.activeNodeParentsPath
    for (let i = 0; i < parentPath.length; i++) {
      if (parentPath[i]?.type === 'col') {
        return true
      }
    }
    return false
  })

  const activeCollectionId = useSelector((state) => {
    const parentPath = state.project.activeNodeParentsPath
    for (let i = parentPath.length - 1; i >= 0; i--) {
      if (parentPath[i]?.type === 'col') {
        return parentPath[i]?.cmscollectionid
      }
    }
  })

  if (activeRightSidebarTab === 'Settings') {
    return (
      <div
        className={
          'projectSettingsPanel' + (isProjectModeDeveloper ? ' active' : '')
        }
      >
        <div className="style-panel-box sticky">
          <div className="style-panel-title-box">
            <div className="text">{activeNodeObject?.type} settings</div>
          </div>
        </div>

        {(isNodeCollection || isNodeInCollection) && (
          <StylePanelTitle title="Collection Settings" />
        )}

        <CollectionListCollectionConnector
          activeCollectionId={activeCollectionId}
          isNodeCollection={isNodeCollection}
          isNodeInCollection={isNodeInCollection}
        />

        <CollectionListFieldsConnetor
          activeCollectionId={activeCollectionId}
          isNodeInCollection={isNodeInCollection}
          isNodeCmsEditable={isNodeCmsEditable}
        />

        <CollectionTemplatePageFieldsConnector />

        {/* <OpenElement /> */}
        {/* <ElementsClassChanger /> */}
        {/* <NodeRepeatableSettings /> */}
      </div>
    )
  }
}
