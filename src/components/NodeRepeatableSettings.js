import { useDispatch, useSelector } from "react-redux"
import { setActiveNodeObject, setActiveNodeRepeatableState } from "../features/pre-rendered-html-nodes";

export default function NodeRepeatableSettings() {

    const activeNodeObject = useSelector((state) => ((state.designerProjectState.activeNodeObject) ? true : false))
    const dispatch = useDispatch()

    function onInputChange(e) {
        dispatch(setActiveNodeRepeatableState(e.target.checked));
        dispatch(setActiveNodeObject());
    }
    return (
        <div style={{display:"flex"}}>
            <div>Allow creator duplicating: </div> 
            <input type="checkbox" checked={activeNodeObject?.repeatable} onChange={onInputChange} />
        </div>
    )
}