import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCollection } from '../../../../features/project'
import CreateNewItemInput from '../navigator/CreateNewItemInput'
import AddButton from '../_atoms/AddButton'
import CollectionListItem from './CollectionListItem'

export default function ProjectCollectionsPanel() {
  const dispatch = useDispatch()
  const collections = useSelector((state) => state.project.collections)
  const activeTab = useSelector((state) => state.project.activeTab)
  const [createInputVisible, setCreateInputVisible] = useState(false)

  // if(activeTab === 'Collections') {
  return (
    <div
      className={
        'collectionsPanel ' + (activeTab === 'Collections' ? 'active' : '')
      }
    >
      <div className="projectTabTitleBox">
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
    </div>
  )
  // }
}
