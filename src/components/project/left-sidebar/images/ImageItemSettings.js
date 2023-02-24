import { useDispatch, useSelector } from 'react-redux'
import { deleteImage } from '../../../../features/project'
import icon from '../../../../img/bin.svg'

export default function ImageItemSettings({ isHovered, id }) {
  const dispatch = useDispatch()

  function handleSettingsClick() {
    dispatch(deleteImage({ id: id }))
  }

  return (
    <div>
      <img
        onClick={handleSettingsClick}
        src={icon}
        className={'image-settings-icon' + (isHovered ? ' active' : '')}
      />
    </div>
  )
}
