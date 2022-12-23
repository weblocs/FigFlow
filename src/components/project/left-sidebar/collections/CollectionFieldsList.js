import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteCollectionItem,
  editCollectionItem,
} from '../../../../features/project'
import { activeCollectionSelector } from '../../../../selectors/active-collection'
import FieldImageInput from './FieldImageInput'
import FieldNameInput from './FieldNameInput'
import FieldTextInput from './FieldTextInput'

export default function CollectionFieldsList() {
  const activeCollection = useSelector((state) =>
    activeCollectionSelector(state)
  )

  const dispatch = useDispatch()

  const [editedCollectionItemData, setEditedCollectionItemData] = useState([])

  function handleInputChange(fieldId, fieldValue, type) {
    let fieldValueExist = false
    let editedCollectionItemFieldIndex = editedCollectionItemData
      .map((x) => {
        if (x.fieldId === fieldId) {
          fieldValueExist = true
        }
        return x.fieldId
      })
      .indexOf(fieldId)

    if (fieldValueExist) {
      let tempEditedCollectionItemData = [...editedCollectionItemData]
      tempEditedCollectionItemData[editedCollectionItemFieldIndex].fieldValue =
        fieldValue
      setEditedCollectionItemData(tempEditedCollectionItemData)
    } else {
      setEditedCollectionItemData((editedCollectionItemData) => [
        ...editedCollectionItemData,
        { fieldId: fieldId, fieldValue: fieldValue },
      ])
    }
  }

  function handleSubmit() {
    event.preventDefault()
    dispatch(editCollectionItem(editedCollectionItemData))
    setEditedCollectionItemData([])
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldNameInput />
      {activeCollection?.fields.map((field) => (
        <div key={field.id}>
          {
            {
              text: (
                <FieldTextInput
                  field={field}
                  handleInputChange={handleInputChange}
                />
              ),

              img: (
                <FieldImageInput
                  field={field}
                  handleInputChange={handleInputChange}
                />
              ),
            }[field.type]
          }
        </div>
      ))}
      <div className="page-settings-wrapper">
        <button className="settings-button blue-button">Save</button>
      </div>
    </form>
  )
}
