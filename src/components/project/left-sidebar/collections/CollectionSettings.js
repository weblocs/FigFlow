import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  editCollection,
  setActiveSettingsCollectionId,
  setKeyboardNavigationOn,
} from '../../../../features/project'
import Button from '../../../ui/Button'
import Input from '../../../ui/Input'
import Label from '../../../ui/Label'
import SidePanel from '../../../ui/SidePanel'
import SidePanelSection from '../../../ui/SidePanelSection'
import SidePanelTitleBar from '../../../ui/SidePanelTitleBar'
import FieldsTitleBar from './FieldsTitleBar'
import CollectionFieldSettings from './CollectionFieldSettings'
import DeleteCollection from './DeleteCollection'

export default function CollectionSettings() {
  const isActiveTab = useSelector(
    (state) =>
      state.project.activeTab === 'Collections' &&
      state.project.collectionPanelState === 'settings' &&
      state.project.activeSettingsCollectionId !== ''
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

  function handleCloseClick() {
    dispatch(setActiveSettingsCollectionId(''))
  }

  useEffect(() => {
    nameRef.current.value = collection?.name
    slugRef.current.value = collection?.slug
  }, [activeSettingsCollectionId])

  return (
    <SidePanel isActive={isActiveTab} width={280}>
      <form onSubmit={handleSubmit}>
        <SidePanelTitleBar title={collection?.name + ' CMS Settings'}>
          <div className="flex gap-8">
            <Button
              text="Close"
              size="sm"
              type="white"
              onClick={handleCloseClick}
            />
            <Button text="Save" size="sm" type="action" submit={true} />
          </div>
        </SidePanelTitleBar>

        <SidePanelSection>
          <Label text="Collection Name" />
          <Input useRef={nameRef} />
          <Label text="Collection URL" />
          <Input useRef={slugRef} mb0={true} />
        </SidePanelSection>
      </form>

      <FieldsTitleBar />

      <SidePanelSection>
        <div className="border-b">
          {collection?.fields.map((field) => (
            <CollectionFieldSettings field={field} key={field.id} />
          ))}
        </div>
      </SidePanelSection>

      <DeleteCollection name={collection?.name} id={collection?.id} />
    </SidePanel>
  )
}
