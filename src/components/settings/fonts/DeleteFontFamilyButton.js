import { useDispatch } from 'react-redux'
import { deleteFontFamily } from '../../../features/project'
import Button from '../../ui/Button'

export default function DeleteFontFamilyButton({ id }) {
  const dispatch = useDispatch()

  function handleClick() {
    dispatch(
      deleteFontFamily({
        id: id,
      })
    )
  }

  return (
    <Button onClick={handleClick} text="Delete Family" size="sm" type="white" />
  )
}
