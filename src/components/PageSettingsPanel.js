import { useDispatch, useSelector } from "react-redux"

export default function PageSettingsPanel() {
    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId)
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)
    const dispatch = useDispatch()

    return (
        <div className={"projectPagesPanel "+ ((activeProjectTab === "Pages") ? "active" : "" )}>
            <div className="projectTabTitleBox">Page Settings</div>
            
        </div>
    )
}