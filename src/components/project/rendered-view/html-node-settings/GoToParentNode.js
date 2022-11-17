import { useDispatch, useSelector } from 'react-redux'
import { setActiveHtmlNode } from '../../../../features/project'

export default function GoToParentNode() {
    const isNodeJoiningParentClasses = useSelector((state) => ((state.project.activeNodeObject?.joinParentClasses) ? true : false))
    const parentNodeClassName = useSelector((state) => state.project.activeNodeParentsPath?.[state.project.activeNodeParentsPath.length - 2]?.class?.[0]?.name || state.project.activeNodeParentsPath?.[state.project.activeNodeParentsPath.length - 2]?.type)
    const parentNodeId = useSelector((state) => state.project.activeNodeParentsPath?.[state.project.activeNodeParentsPath.length - 2]?.id)
    
    const dispatch = useDispatch()

    function handleClick(e) {
        e.stopPropagation();
        dispatch(setActiveHtmlNode({id: parentNodeId}))
    }

    return (
        <div className={"rich-element-settings_button" + ((parentNodeClassName !== undefined) ? " active" : "")}>
            <div className="rich-element-settings_button-text" 
            onClick={handleClick}>
                <span>PARENT</span>
                {/* {parentNodeClassName?.replace("-", " ")?.replace("_", " ")} */}
            </div>
        </div>
    )
}