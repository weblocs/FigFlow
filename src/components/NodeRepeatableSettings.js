import { useDispatch, useSelector } from "react-redux"
import { setActiveNodeRepeatableState } from "../features/pre-rendered-html-nodes";
import StylePanelTitle from "./style-panel/StylePanelTitle";

export default function NodeRepeatableSettings() {

    const nodeType = useSelector((state) => state.designerProjectState.activeNodeObject?.type)
    const isNodeRepeatable = useSelector((state) => ((state.designerProjectState.activeNodeObject?.repeatable) ? true : false))
    const dispatch = useDispatch()

    function onInputChange(e) {
        dispatch(setActiveNodeRepeatableState(e.target.checked));
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