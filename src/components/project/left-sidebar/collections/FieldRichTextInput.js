import { useSelector } from 'react-redux'
import { activeCollectionItemSelector } from '../../../../selectors/active-collection'
import RichTextEditor from '../../rich-text-editor/Editor'

export default function FieldRichTextInput({ field, handleInputChange }) {
  const fieldValue = useSelector(
    (state) =>
      activeCollectionItemSelector(state)?.data?.find(
        ({ fieldId }) => fieldId === field.id
      )?.fieldValue || ''
  )

  function setContent(content) {
    handleInputChange(field.id, content)
  }

  return (
    <div className="cms-field-input-wrap">
      <div className="cms-field-input-label">{field.name}</div>
      <div className="cms-field-rich-text">
        <RichTextEditor content={fieldValue} setContent={setContent} />
      </div>
    </div>
  )
}
