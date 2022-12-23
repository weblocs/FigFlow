import { useDispatch, useSelector } from 'react-redux'
import {
  archiveCollectionItem,
  deleteCollectionItem,
  duplicateCollectionItem,
  setCollectionPanelState,
  unArchiveCollectionItem,
} from '../../../../features/project'
import { activeCollectionItemSelector } from '../../../../selectors/active-collection'

export default function ItemActionButtons() {
  const activeCollectionItemId = useSelector(
    (state) => activeCollectionItemSelector(state).id
  )
  const isArchived = useSelector(
    (state) => activeCollectionItemSelector(state)?.archived === true
  )
  const dispatch = useDispatch()

  function handleDelete() {
    dispatch(deleteCollectionItem(activeCollectionItemId))
    dispatch(setCollectionPanelState('items'))
  }

  function handleArchive() {
    dispatch(archiveCollectionItem(activeCollectionItemId))
    dispatch(setCollectionPanelState('items'))
  }

  function handleUnArchive() {
    dispatch(unArchiveCollectionItem(activeCollectionItemId))
    dispatch(setCollectionPanelState('items'))
  }

  function handleDuplicate() {
    dispatch(duplicateCollectionItem(activeCollectionItemId))
    dispatch(setCollectionPanelState('items'))
  }

  return (
    <div className="page-settings-wrapper padding-top-0">
      <div className="page-settings-action-buttons">
        <div className="page-settings-action-button" onClick={handleDelete}>
          Detete
        </div>

        {!isArchived ? (
          <div className="page-settings-action-button" onClick={handleArchive}>
            Archive
          </div>
        ) : (
          <div
            className="page-settings-action-button"
            onClick={handleUnArchive}
          >
            Unarchive
          </div>
        )}
        <div className="page-settings-action-button" onClick={handleDuplicate}>
          Duplicate
        </div>
      </div>
    </div>
  )
}
