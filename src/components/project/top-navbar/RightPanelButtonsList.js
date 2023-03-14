import { useSelector } from 'react-redux'
import ProjectRightSidebarButton from './ProjectRightSidebarButton'

import StyleIcon from '../../../img/styles.svg'
import SettingsIcon from '../../../img/settings.svg'
import StyleGuideIcon from '../../../img/style-guide.svg'

export default function RightPanelButtonsList() {
  const projectModeCreator = useSelector(
    (state) => state.project.projectMode === 'creator'
  )

  return (
    <div
      className={
        'project-right-sidebar-nav_wrap' +
        (projectModeCreator ? ' is-small' : '')
      }
    >
      <ProjectRightSidebarButton letter="S" icon={StyleIcon} tab="Style" />

      <ProjectRightSidebarButton
        letter="D"
        icon={SettingsIcon}
        tab="Settings"
      />

      <ProjectRightSidebarButton
        letter="G"
        icon={StyleGuideIcon}
        tab="Style Guide"
      />
    </div>
  )
}
