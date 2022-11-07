import { useDispatch, useSelector } from 'react-redux'
import { setActiveHtmlNodeParentClassJoinState } from '../../../features/project';

export default function ParentClassJoin() {
    const isNodeJoiningParentClasses = useSelector((state) => ((state.project.activeNodeObject?.joinParentClasses) ? true : false))
    const dispatch = useDispatch()

    function onInputChange(e) {
        dispatch(setActiveHtmlNodeParentClassJoinState(e.target.checked));
    }

    return (
        <>
            <div className="style-panel-box" style={{display:"flex"}}>
                <div>Conect classes with parent: </div> 
                <input type="checkbox" checked={isNodeJoiningParentClasses} onChange={onInputChange} />
            </div>
            <button>Add to all elements with same class</button>
        </>
    )
}