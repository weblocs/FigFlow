import { useDispatch, useSelector } from "react-redux"

export default function CMSFieldNodeConnector() {
    const activeNodeObject =  useSelector((state) => state.designerProjectState.activeNodeObject)
    const isTemplateEditingOn =  useSelector((state) => (state.designerProjectState.nodesEditMode === "cmsTemplate"))
    const dispatch = useDispatch()

    return (
        <div>
            {(isTemplateEditingOn) ? (
                <div>
                <div>CMS Template Editing</div>
                {(activeNodeObject?.type === "h" || activeNodeObject?.type === "p" ) && 
                (<div>H</div>)}
                </div>
            ) : (<div></div>)}
        </div>
    )
}