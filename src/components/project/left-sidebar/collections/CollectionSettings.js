import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteCollection,
  editCollection,
  setActiveSettingsCollectionId,
  setCollectionPanelState,
  setKeyboardNavigationOn,
} from '../../../../features/project'
import AddNewField from './AddNewField'
import CollectionFieldSettings from './CollectionFieldSettings'
import DeleteCollection from './DeleteCollection'

export default function CollectionSettings() {
  const activeTab = useSelector((state) => state.project.activeTab)
  const collectionPanelState = useSelector(
    (state) => state.project.collectionPanelState
  )
  const activeSettingsCollectionId = useSelector(
    (state) => state.project.activeSettingsCollectionId
  )
  const collection = useSelector((state) =>
    state.project.collections?.find(
      ({ id }) => id === activeSettingsCollectionId
    )
  )
  const dispatch = useDispatch()

  const nameRef = useRef()
  const slugRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(
      editCollection({
        id: activeSettingsCollectionId,
        property: 'name',
        value: nameRef.current.value,
      })
    )
    dispatch(
      editCollection({
        id: activeSettingsCollectionId,
        property: 'slug',
        value: slugRef.current.value,
      })
    )
    dispatch(setActiveSettingsCollectionId(''))
  }

  function handleFocus() {
    dispatch(setKeyboardNavigationOn(false))
  }

  function handleBlur() {
    dispatch(setKeyboardNavigationOn(true))
  }

  useEffect(() => {
    nameRef.current.value = collection?.name
    slugRef.current.value = collection?.slug
  }, [activeSettingsCollectionId])

  return (
    <div
      className={
        'projectPagesPanel wider ' +
        (activeTab === 'Collections' &&
        collectionPanelState === 'settings' &&
        activeSettingsCollectionId !== ''
          ? 'active'
          : '')
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="projectTabTitleBox">
          {collection?.name} CMS Settings
          <div className="projectTabTitleButtonsBox">
            <div
              className="settings-button white-button"
              onClick={() => dispatch(setActiveSettingsCollectionId(''))}
            >
              Close
            </div>
            <button className="settings-button blue-button">Save</button>
          </div>
        </div>

        <div className="page-settings-wrapper bottom-line">
          <label className="settings-label">Collection Name</label>
          <input
            ref={nameRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="settings-input"
          />

          <label className="settings-label">Collection URL</label>
          <input
            ref={slugRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="settings-input no-margin-bottom"
          />
        </div>
      </form>

      <AddNewField />

      <div className="page-settings-wrapper">
        <div className="collection-fields-settings_list">
          {collection?.fields.map((field) => (
            <CollectionFieldSettings field={field} key={field.id} />
          ))}
        </div>
      </div>

      <DeleteCollection name={collection?.name} id={collection?.id} />
    </div>
  )
}
