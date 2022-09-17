import { useSelector } from "react-redux"
import ProjectRightSidebarButton from "./ProjectRightSidebarButton"

import StyleIcon from '../../../img/styling.svg'
import SettingsIcon from '../../../img/settings.svg'

export default function RightPanelButtonsList() {
    const projectMode = useSelector((state) => state.designerProjectState.projectMode)

    if (projectMode === "developer") {
        return (
            <>
                <ProjectRightSidebarButton letter="S" icon={StyleIcon} tab="Style" />
                <ProjectRightSidebarButton letter="D" icon={SettingsIcon} tab="Settings" />
            </>
        )
    }
}