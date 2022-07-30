import { useDispatch, useSelector } from "react-redux"
import { setActiveNodeRepeatableState } from "../features/pre-rendered-html-nodes";

export default function NodeRepeatableSettings() {

    const isNodeRepeatable = useSelector((state) => ((state.designerProjectState.activeNodeObject?.repeatable) ? true : false))
    const dispatch = useDispatch()

    function onInputChange(e) {
        dispatch(setActiveNodeRepeatableState(e.target.checked));
    }
    return (
        <div style={{display:"flex"}}>
            <div>Allow creator duplicating: </div> 
            <input type="checkbox" checked={isNodeRepeatable} onChange={onInputChange} />
        </div>
    )
}