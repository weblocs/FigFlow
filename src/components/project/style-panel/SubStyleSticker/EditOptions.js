import { useDispatch, useSelector } from 'react-redux'

export default function EditOptions({
  editingOptionsTurnOn,
  setEditingOptionsTurnOn,
}) {
  return (
    <button onClick={() => setEditingOptionsTurnOn(!editingOptionsTurnOn)}>
      Edit options
    </button>
  )
}
