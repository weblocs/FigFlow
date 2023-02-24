import { useDispatch, useSelector } from 'react-redux'
import { deleteFont } from '../../../features/project'
import Button from '../../ui/Button'

export default function DeleteFontButton({ fontId, weight }) {
  const dispatch = useDispatch()

  function handleClick() {
    dispatch(
      deleteFont({
        fontId: fontId,
        id: weight.id,
      })
    )
  }

  return <Button onClick={handleClick} text="Delete" size="sm" type="white" />
}
