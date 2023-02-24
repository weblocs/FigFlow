import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCollection } from '../../../../features/project'
import SidePanel from '../../../ui/SidePanel'
import CreateNewItemInput from '../navigator/CreateNewItemInput'
import AddButton from '../_atoms/AddButton'
import CollectionListItem from './CollectionListItem'

export default function ProjectCollectionsPanel() {
  const dispatch = useDispatch()
  const collections = useSelector((state) => state.project.collections)
  const isTabActive = useSelector(
    (state) => state.project.activeTab === 'Collections'
  )
  const [createInputVisible, setCreateInputVisible] = useState(false)

  // if(activeTab === 'Collections') {
  return (
    <SidePanel isActive={isTabActive}>
      <div className="side-panel-title">
        Collections
        <div className="projectTabTitleButtonsBox">
          <AddButton fx={() => setCreateInputVisible(!createInputVisible)} />
        </div>
      </div>

      <CreateNewItemInput
        visibility={createInputVisible}
        setVisibility={setCreateInputVisible}
        create={addCollection}
        placeholder="New colection"
      />

      <div className="pagesList">
        {collections.map((collection) => (
          <CollectionListItem
            key={collection.id}
            id={collection.id}
            name={collection.name}
          />
        ))}
      </div>
    </SidePanel>
  )
  // }
}
