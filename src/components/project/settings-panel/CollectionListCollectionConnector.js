import { useDispatch, useSelector } from 'react-redux'
import { editHtmlNode } from '../../../features/project'
import FilterCurrentItem from './FilterCurrentItem'

export default function CollectionListCollectionConnector({
  activeCollectionId,
  isNodeCollection,
  isNodeInCollection,
}) {
  const activeCollectionNodeId = useSelector((state) => {
    const parentPath = state.project.activeNodeParentsPath
    for (let i = parentPath.length - 1; i >= 0; i--) {
      if (parentPath[i]?.type === 'col') {
        return parentPath[i]?.id
      }
    }
  })
  const collections = useSelector((state) => state.project.collections)
  const dispatch = useDispatch()

  function handleClickInCollectionItem(collectionId) {
    dispatch(
      editHtmlNode({
        id: activeCollectionNodeId,
        field: 'cmsCollectionId',
        value: collectionId,
      })
    )
  }

  return (
    <div>
      {(isNodeCollection || isNodeInCollection) && (
        <div>
          <div className="style-panel-box">
            <div className="style-panel-box-title">Collections</div>

            <div className="fields-select_list">
              {collections.map((collection) => (
                <div
                  className={
                    'fields-select_item' +
                    (activeCollectionId === collection.id ? ' active' : '')
                  }
                  onClick={() => handleClickInCollectionItem(collection.id)}
                  key={collection.id}
                >
                  <div>{collection.name}</div>
                </div>
              ))}
            </div>
          </div>
          <FilterCurrentItem
            activeCollectionNodeId={activeCollectionNodeId}
            activeCollectionId={activeCollectionId}
          />
        </div>
      )}
    </div>
  )
}
