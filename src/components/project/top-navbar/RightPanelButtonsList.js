import { useSelector } from 'react-redux'
import ProjectRightSidebarButton from './ProjectRightSidebarButton'

import StyleIcon from '../../../img/styling.svg'
import SettingsIcon from '../../../img/settings.svg'
import StyleGuideIcon from '../../../img/book.svg'

export default function RightPanelButtonsList() {
  const projectMode = useSelector((state) => state.project.projectMode)

  return (
    <div className="project-right-sidebar-nav_wrap">
      <ProjectRightSidebarButton letter="S" icon={StyleIcon} tab="Style" />
      {projectMode === 'developer' && (
        <ProjectRightSidebarButton
          letter="D"
          icon={SettingsIcon}
          tab="Settings"
        />
      )}
      <ProjectRightSidebarButton
        letter="G"
        icon={StyleGuideIcon}
        tab="Style Guide"
      />
    </div>
  )
}
