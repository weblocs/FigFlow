import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editHtmlNode } from '../../../features/project'
import Arrow from '../../../img/arrow-down.svg'
import StylePanelTitle from '../style-panel/StylePanelTitle'
import ConnectorFieldItem from './ConnectorFieldItem'

export default function CollectionTemplatePageFieldsConnector() {
  const activeNodeObject = useSelector(
    (state) => state.project.activeNodeObject
  )
  const collections = useSelector((state) => state.project.collections)
  const activeNodeId = useSelector((state) => state.project.activeNodeId)
  const activeCollectionTemplateId = useSelector(
    (state) => state.project.activeCollectionTemplateId
  )
  const isInTemplateEditingPage = useSelector(
    (state) => state.project.nodesEditMode === 'cmsTemplate'
  )
  const activeCmsFieldId = useSelector(
    (state) => state.project.activeNodeObject?.cmsFieldId
  )
  const isNodeCmsEditable = useSelector(
    (state) =>
      state.project.activeNodeObject?.cmsFieldId !== undefined &&
      state.project.activeNodeObject?.cmsFieldId !== ''
  )
  const activeCollectionItems = useSelector(
    (state) =>
      state.project.collections?.find(
        ({ id }) => id === state.project.activeCollectionTemplateId
      )?.items
  )

  const isNodeInCollection = useSelector((state) => {
    const parentPath = state.project.activeNodeParentsPath
    for (let i = 0; i < parentPath.length; i++) {
      if (parentPath[i]?.type === 'col') {
        return true
      }
    }
    return false
  })

  const nodeType =
    ((activeNodeObject?.type === 'h' || activeNodeObject?.type === 'p') &&
      'text') ||
    (activeNodeObject?.type === 'img' && 'img') ||
    (activeNodeObject?.type === 'rich_text' && 'rich_text')

  const dispatch = useDispatch()

  function handleClickInFieldItem(id) {
    dispatch(editHtmlNode({ id: activeNodeId, field: 'cmsFieldId', value: id }))
  }

  function handleCheckboxClick() {
    if (isNodeCmsEditable) {
      dispatch(
        editHtmlNode({ id: activeNodeId, field: 'cmsFieldId', value: '' })
      )
    } else {
      if (activeCollectionItems[0]?.data[0]?.fieldId !== undefined) {
        dispatch(
          editHtmlNode({
            id: activeNodeId,
            field: 'cmsFieldId',
            value: activeCollectionItems[0]?.data[0]?.fieldId,
          })
        )
      }
    }
  }

  useEffect(() => {
    if (
      collections?.find(({ id }) => id === activeCollectionTemplateId)
        ?.fields === undefined
    ) {
      return
    }
    console.log(
      collections.find(({ id }) => id === activeCollectionTemplateId)?.fields
    )
  }, [activeCollectionTemplateId])

  return (
    <div>
      {isInTemplateEditingPage && !isNodeInCollection ? (
        <>
          <StylePanelTitle title="Collection Template" />
          <div className="style-panel-box">
            {(activeNodeObject?.type === 'h' ||
              activeNodeObject?.type === 'p' ||
              activeNodeObject?.type === 'img' ||
              activeNodeObject?.type === 'rich_text') && (
              <div style={{ display: 'flex' }}>
                CMS Template Editing:
                <input
                  type="checkbox"
                  checked={isNodeCmsEditable}
                  onChange={handleCheckboxClick}
                />
              </div>
            )}

            {(activeNodeObject?.type === 'h' ||
              activeNodeObject?.type === 'p' ||
              activeNodeObject?.type === 'img' ||
              activeNodeObject?.type === 'rich_text') &&
              isNodeCmsEditable && (
                <div>
                  <div className="fields-select">
                    Get text from{' '}
                    {
                      collections.find(
                        ({ id }) => id === activeCollectionTemplateId
                      )?.name
                    }
                    <img src={Arrow} className="fields-item-arrow" />
                  </div>
                  <div className="fields-select_list">
                    {(activeNodeObject?.type === 'h' ||
                      activeNodeObject?.type === 'p') && (
                      <ConnectorFieldItem
                        field={{ name: 'Name', id: '0' }}
                        handleClick={handleClickInFieldItem}
                      />
                    )}
                    {collections
                      .find(({ id }) => id === activeCollectionTemplateId)
                      ?.fields.filter(({ type }) => type === nodeType)
                      .map((field) => (
                        <ConnectorFieldItem
                          key={field.id}
                          field={field}
                          handleClick={handleClickInFieldItem}
                        />
                      ))}
                  </div>
                </div>
              )}
          </div>
        </>
      ) : (
        <div></div>
      )}
    </div>
  )
}
