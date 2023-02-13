import { useDispatch, useSelector } from 'react-redux'
import { activeCollectionItemSelector } from '../../../../selectors/active-collection'
import FileUploaderToCollectionField from './FileUploaderToCollectionField'

export default function FieldImageInput({ field, handleInputChange }) {
  const fieldValue = useSelector(
    (state) =>
      activeCollectionItemSelector(state)?.data?.find(
        ({ fieldId }) => fieldId === field.id
      )?.fieldValue || ''
  )
  const dispatch = useDispatch()

  return (
    <div className="cms-field-input-wrap">
      <div className="cms-field-input-label">{field.name}</div>
      <img
        className="libraryImage"
        src={
          'https://firebasestorage.googleapis.com/v0/b/figflow-5a912.appspot.com/o/' +
          fieldValue +
          '?alt=media&token=fe82f3f8-fd09-40ae-9168-25ebc8835c9a'
        }
      />
      <FileUploaderToCollectionField
        handleInputChange={(fieldValue) =>
          handleInputChange(field.id, fieldValue)
        }
      />
    </div>
  )
}
