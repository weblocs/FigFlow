import { useDispatch, useSelector } from "react-redux"

export default function VersionsChanger() {
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)
    const dispatch = useDispatch()

    if(activeProjectTab === "Versions") {
        return (
            <>
            <div className="page-changer page-changer_description">
                Versions
            </div>
            <div className="page-changer">
                A
            </div>
            <div className="page-changer">
                B
            </div>
            <div className="page-changer">
                C
            </div>
            <div className="page-changer">
                Add
            </div>
            </>
        )
    }
}