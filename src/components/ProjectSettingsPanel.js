import React from "react"; 
import { useSelector } from "react-redux";

export default function ProjectSettingsPanel() {
    const activeRightSidebarTab = useSelector((state) => state.designerProjectState.activeRightSidebarTab)
    return (
        <div className={"projectSettingsPanel "+ ((activeRightSidebarTab === "Settings") ? "active" : "" )}>
            
        </div>
    )
}