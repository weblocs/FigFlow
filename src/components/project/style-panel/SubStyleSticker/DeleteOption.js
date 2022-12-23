import { useDispatch } from 'react-redux'
import { deleteStyleOption } from '../../../../features/project'

export default function DeleteOption({ index }) {
  const dispatch = useDispatch()

  function handleClick() {
    dispatch(deleteStyleOption({ index: index }))
  }

  return <button onClick={handleClick}>Delete</button>
}
