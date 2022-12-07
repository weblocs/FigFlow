import { useDispatch, useSelector } from 'react-redux'
import DragInput from '../_atoms/DragInput'
import AddFolder from './AddFolder'
import StyleGuideColors from './InputColor'
import StyleGuideFolder from './Folder'

export default function StyleGuidePanel() {
  const isOpenTabStyleGuide = useSelector(
    (state) => state.project.activeRightSidebarTab === 'Style Guide'
  )
  const isDeveloperMode = useSelector(
    (state) => state.project.projectMode === 'developer'
  )
  const styleGuide = useSelector((state) => state.project.styleGuide)

  const dispatch = useDispatch()

  return (
    <div
      className={'style-guide-panel ' + (isOpenTabStyleGuide ? ' active' : '')}
    >
      <div className="style-panel-box">
        <div className="style-panel-title-box">
          <div className="text">Style Guide</div>
          {isDeveloperMode && <AddFolder />}
        </div>
      </div>

      <StyleGuideColors />

      {styleGuide?.map((folder) => (
        <StyleGuideFolder folder={folder} key={folder.id} />
      ))}
    </div>
  )
}
