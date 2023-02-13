import { useDispatch, useSelector } from 'react-redux'
import { editHtmlNode } from '../../../features/project'
import Arrow from '../../../img/arrow-down.svg'
import ConnectorFieldItem from './ConnectorFieldItem'

export default function CollectionListFieldsConnetor({
  activeCollectionId,
  isNodeInCollection,
  isNodeCmsEditable,
}) {
  const collections = useSelector((state) => state.project.collections)
  const activeNodeId = useSelector((state) => state.project.activeNodeId)
  const activeNodeObject = useSelector(
    (state) => state.project.activeNodeObject
  )
  const activeCollectionItems = useSelector(
    (state) =>
      state.project.collections?.find(({ id }) => id === activeCollectionId)
        ?.items
  )

  const dispatch = useDispatch()

  function handleClickInFieldItem(fieldId) {
    dispatch(
      editHtmlNode({ id: activeNodeId, field: 'cmsFieldId', value: fieldId })
    )
  }

  function handleCheckboxClick() {
    dispatch(
      editHtmlNode({
        id: activeNodeId,
        field: 'cmsFieldId',
        value: isNodeCmsEditable
          ? ''
          : activeCollectionItems[0].data[0].fieldId,
      })
    )
  }

  const isNodeAvailbleForCMS =
    activeNodeObject?.type === 'h' ||
    activeNodeObject?.type === 'p' ||
    activeNodeObject?.type === 'img' ||
    activeNodeObject?.type === 'rich_text'
  const isNodeText =
    activeNodeObject?.type === 'h' || activeNodeObject?.type === 'p'
  const isNodeImage = activeNodeObject?.type === 'img'
  const isNodeRichText = activeNodeObject?.type === 'rich_text'

  const nodeType =
    (isNodeText && 'text') ||
    (isNodeImage && 'img') ||
    (isNodeRichText && 'rich_text')

  if (isNodeInCollection && isNodeAvailbleForCMS) {
    return (
      <div>
        <div>
          <div className="style-panel-box">
            <div className="fields-select">
              <input
                type="checkbox"
                checked={isNodeCmsEditable}
                onChange={handleCheckboxClick}
              />
              Get {nodeType} from{' '}
              {collections.find(({ id }) => id === activeCollectionId)?.name}
              <img src={Arrow} className="fields-item-arrow" />
            </div>

            <div className="fields-select_list">
              {isNodeText && (
                <ConnectorFieldItem
                  field={{ name: 'Name', id: '0' }}
                  handleClick={handleClickInFieldItem}
                />
              )}
              {collections
                .find(({ id }) => id === activeCollectionId)
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
        </div>
      </div>
    )
  }
}
