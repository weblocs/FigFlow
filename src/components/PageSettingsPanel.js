import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function PageSettingsPanel() {
    const activePage = useSelector((state) => state.designerProjectState.activePage)
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)
    const dispatch = useDispatch()
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.value = activePage.name;
    },[activePage?.id])

    return (
        <div className={"projectPagesPanel "+ ((activeProjectTab === "Pages") ? "active" : "" )}>
            <div className="projectTabTitleBox">Page Settings</div>
            <label>Page Name</label>
            <input ref={inputRef} />
        </div>
    )
}