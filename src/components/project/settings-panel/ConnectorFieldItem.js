import { useDispatch, useSelector } from 'react-redux'

export default function ConnectorFieldItem({ field, handleClick }) {
  const activeNodeObject = useSelector(
    (state) => state.project.activeNodeObject
  )
  const dispatch = useDispatch()

  return (
    <div
      onClick={() => handleClick(field.id)}
      className={
        'fields-select_item' +
        (activeNodeObject?.cmsFieldId === field.id ? ' active' : '')
      }
    >
      {field.name}
    </div>
  )
}
