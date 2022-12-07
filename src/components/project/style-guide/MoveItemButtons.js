import { useDispatch, useSelector } from 'react-redux'
import {
  moveStyleGuideFolder,
  moveStyleGuideItem,
} from '../../../features/project'

export default function MoveStyleGuideButtons({ id, folderId }) {
  const preRenderedHTMLNodes = useSelector(
    (state) => state.project.preRenderedHTMLNodes
  )
  const dispatch = useDispatch()

  function isFolder() {
    return folderId === undefined
  }

  function handleClickMoveUp() {
    if (isFolder()) {
      dispatch(moveStyleGuideFolder({ id, direction: 'up' }))
    } else {
      dispatch(moveStyleGuideItem({ folderId, id, direction: 'up' }))
    }
  }

  function handleClickMoveDown() {
    if (isFolder()) {
      dispatch(moveStyleGuideFolder({ id, direction: 'down' }))
    } else {
      dispatch(moveStyleGuideItem({ folderId, id, direction: 'down' }))
    }
  }

  return (
    <div className="style-guide-edit_move-wrap">
      <div className="style-guide-edit_move-title">Move</div>
      <div className="projectTabTitleButtonsBox">
        <div
          onClick={handleClickMoveUp}
          className="settings-button white-button"
        >
          Up
        </div>
        <div
          onClick={handleClickMoveDown}
          className="settings-button white-button"
        >
          Down
        </div>
      </div>
    </div>
  )
}
