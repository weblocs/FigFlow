import { useDispatch, useSelector } from "react-redux"
import { setActiveHtmlNodeRepeatableState } from "../../../features/project";
import StylePanelTitle from "../style-panel/StylePanelTitle";

export default function NodeRepeatableSettings() {

    const nodeType = useSelector((state) => state.project.activeNodeObject?.type)
    const isNodeRepeatable = useSelector((state) => ((state.project.activeNodeObject?.repeatable) ? true : false))
    const dispatch = useDispatch()

    function onInputChange(e) {
        dispatch(setActiveHtmlNodeRepeatableState(e.target.checked));
    }

    if (nodeType !== "sym") {
        return (
            <>
            <StylePanelTitle title="Repeatable" />
            <div className="style-panel-box" style={{display:"flex"}}>
                <div>Allow creator duplicating: </div> 
                <input type="checkbox" checked={isNodeRepeatable} onChange={onInputChange} />
            </div>
            </>
        )
    }
}