import { useDispatch } from 'react-redux'
import { removeStyleOption } from '../../../../features/project'

export default function RemoveOption({ index, handleOpen }) {
  const dispatch = useDispatch()

  function handleClearClick(index) {
    handleOpen(false)
    dispatch(removeStyleOption({ optionIndex: index }))
  }

  return <button onClick={() => handleClearClick(index)}>Remove/Clear</button>
}
