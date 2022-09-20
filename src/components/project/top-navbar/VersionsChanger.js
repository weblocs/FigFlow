import { useDispatch, useSelector } from "react-redux"
import { addVersion, clearVersions, setActiveVersion } from "../../../features/pre-rendered-html-nodes"

function getLetterByIndex(index) {
    let letter = "A";
    (index === 1) && (letter = "B");
    (index === 2) && (letter = "C");
    (index === 3) && (letter = "D");
    (index === 4) && (letter = "E");
    (index === 5) && (letter = "F");
    return letter;
}

export default function VersionsChanger() {
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)
    const projectVersions = useSelector((state) => state.designerProjectState.projectVersions)
    const activeProjectVersionId = useSelector((state) => state.designerProjectState.activeProjectVersionId)    
    const dispatch = useDispatch()

    if(activeProjectTab === "Versions") {
        return (
            <>
            <div className="page-changer page-changer_description">
                Versions
            </div>
            {projectVersions.map((version, index) => (
                <div className={"page-changer" + ((activeProjectVersionId === version.id) ? " active" : "")} 
                onClick={() => dispatch(setActiveVersion(version.id))}
                key={version.id}>
                    {getLetterByIndex(index)}
                </div>
            ))}
            <div className="page-changer" 
            onClick={() => dispatch(addVersion())}>
                Add
            </div>
            <div className="page-changer" onClick={() => dispatch(clearVersions())}>
                Choose version
            </div>
            </>
        )
    }
}