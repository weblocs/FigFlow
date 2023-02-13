import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setKeyboardNavigationOn,
  editPage,
  openPageSettings,
  closePageSettings,
  deletePage,
  deletePageFolder,
  editPageFolder,
  editCollection,
} from '../../../../features/project'
import ConfirmDeleteModalButton from '../../modals/ConfirmDeleteModalButton'
import PageScriptsSettings from './PageScriptsSettings'

export default function PageSettingsPanel() {
  const activeTab = useSelector((state) => state.project.activeTab)
  const openedSettingsPage = useSelector(
    (state) => state.project.openedSettingsPage
  )
  const isCmsPage = useSelector(
    (state) => state.project.openedSettingsPage?.items !== undefined
  )
  const isOpenedHomepage = useSelector(
    (state) =>
      state.project.projectPages?.[0]?.id ==
      state.project.openedSettingsPage?.id
  )
  const isOpenedPageFolder = useSelector(
    (state) => state.project.openedSettingsPage?.children !== undefined
  )

  const dispatch = useDispatch()
  const inputRef = useRef()
  const inputSlugRef = useRef()
  const inputMetaTitleRef = useRef()
  const inputMetaDescriptionRef = useRef()

  function handleSubmit() {
    event.preventDefault()

    if (isCmsPage) {
      dispatch(
        editCollection({
          id: openedSettingsPage.id,
          property: 'name',
          value: inputRef.current.value,
        })
      )
      dispatch(
        editCollection({
          id: openedSettingsPage.id,
          property: 'slug',
          value: inputSlugRef.current.value,
        })
      )
      dispatch(
        editCollection({
          id: openedSettingsPage.id,
          property: 'metaTitle',
          value: inputMetaTitleRef.current.value,
        })
      )
      dispatch(
        editCollection({
          id: openedSettingsPage.id,
          property: 'metaDescription',
          value: inputMetaDescriptionRef.current.value,
        })
      )
    } else if (isOpenedPageFolder) {
      dispatch(
        editPageFolder({ property: 'name', value: inputRef.current.value })
      )
      dispatch(
        editPageFolder({ property: 'slug', value: inputSlugRef.current.value })
      )
    } else {
      dispatch(editPage({ property: 'name', value: inputRef.current.value }))
      dispatch(
        editPage({ property: 'slug', value: inputSlugRef.current.value })
      )
      dispatch(
        editPage({
          property: 'metaTitle',
          value: inputMetaTitleRef.current.value,
        })
      )
      dispatch(
        editPage({
          property: 'metaDescription',
          value: inputMetaDescriptionRef.current.value,
        })
      )
    }

    dispatch(closePageSettings())
  }

  function handleFocus() {
    dispatch(setKeyboardNavigationOn(false))
  }

  function handleBlur() {
    dispatch(setKeyboardNavigationOn(true))
  }

  useEffect(() => {
    inputRef.current.value = openedSettingsPage.name
    inputSlugRef.current.value = openedSettingsPage.slug || ''
    if (!isOpenedPageFolder) {
      inputMetaTitleRef.current.value = openedSettingsPage.metaTitle || ''
      inputMetaDescriptionRef.current.value =
        openedSettingsPage.metaDescription || ''
    }
  }, [openedSettingsPage])

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={
          'projectPagesPanel wider ' +
          (activeTab === 'Pages' && openedSettingsPage?.id ? 'active' : '')
        }
      >
        <div className="projectTabTitleBox">
          {isCmsPage && 'CMS '}Page Settings
          <div className="projectTabTitleButtonsBox">
            {!isCmsPage &&
              (isOpenedPageFolder ? (
                <ConfirmDeleteModalButton
                  handleOnClick={() => dispatch(deletePageFolder())}
                  deleteItemName={openedSettingsPage?.name}
                  deleteItemType="folder"
                  redButton={false}
                />
              ) : (
                <ConfirmDeleteModalButton
                  handleOnClick={() => dispatch(deletePage())}
                  deleteItemName={openedSettingsPage?.name}
                  deleteItemType="page"
                  redButton={false}
                />
              ))}

            <div
              className="settings-button white-button"
              onClick={() => dispatch(openPageSettings({}))}
            >
              Close
            </div>
            <button className="settings-button">Save</button>
          </div>
        </div>
        <div className="page-settings-wrapper">
          <label className="settings-label">Page Name</label>
          <input
            className="settings-input"
            name="page-name"
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <label className="settings-label">Page Slug</label>
          <div
            className={
              'settings-input-box' + (isOpenedHomepage ? ' hidden' : '')
            }
          >
            <input
              className="settings-input"
              style={{ marginBottom: '0' }}
              ref={inputSlugRef}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <span
            style={{
              fontSize: '10px',
              lineHeight: '10px',
              marginTop: '4px',
              marginBottom: '12px',
              padding: '4px 8px',
              border: '1px solid #cecece',
            }}
          >
            /{openedSettingsPage.slug}
          </span>

          {!isOpenedPageFolder && (
            <>
              <label className="settings-label">Title Tag</label>
              <input
                className="settings-input"
                ref={inputMetaTitleRef}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />

              <label className="settings-label">Meta Description</label>
              <input
                className="settings-input"
                ref={inputMetaDescriptionRef}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />

              {/* <label className="settings-label">Custom Code Head</label>
                    <input 
                    className="settings-input"
                    ref={inputMetaNameRef}
                    onFocus={handleFocus} 
                    onBlur={handleBlur}  />

                    <label className="settings-label">Custom Code Body</label>
                    <input 
                    className="settings-input"
                    ref={inputMetaNameRef}
                    onFocus={handleFocus} 
                    onBlur={handleBlur}  /> */}
              <PageScriptsSettings />
            </>
          )}
        </div>
      </div>
    </form>
  )
}
