import { useSelector } from "react-redux"
import ProjectRightSidebarButton from "./ProjectRightSidebarButton"

export default function RightPanelButtonsList() {
    const projectMode = useSelector((state) => state.designerProjectState.projectMode)

    if (projectMode === "developer") {
        return (
            <>
                <ProjectRightSidebarButton letter="S" tab="Style" />
                <ProjectRightSidebarButton letter="D" tab="Settings" />
            </>
        )
    }
}