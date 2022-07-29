import { useDispatch, useSelector } from "react-redux"
import { editSelectedFieldInPreRenderedHTMLNode, setActiveNodeObject } from "../features/pre-rendered-html-nodes";
import Arrow from '../img/arrow-down.svg';

export default function CMSFieldNodeConnector() {
    const activeNodeObject =  useSelector((state) => state.designerProjectState.activeNodeObject)
    const projectCollections =  useSelector((state) => state.designerProjectState.projectCollections)
    const activeNodeId =  useSelector((state) => state.designerProjectState.activeNodeId)
    const activeCollectionTemplateId =  useSelector((state) => state.designerProjectState.activeCollectionTemplateId)
    const isTemplateEditingOn =  useSelector((state) => (state.designerProjectState.nodesEditMode === "cmsTemplate"))
    const dispatch = useDispatch()

    function handleClickInFieldItem(id) {
        dispatch(editSelectedFieldInPreRenderedHTMLNode({id:activeNodeId, field:'cmsFieldId', value:id}));
        dispatch(setActiveNodeObject());
    }

    return (
        <div>
            {(isTemplateEditingOn) ? (
                <div>
                <div>CMS Template Editing</div>
                {(activeNodeObject?.type === "h" || activeNodeObject?.type === "p" ) && 
                (
                    <div>
                        <div className="fields-select">
                            Get text from {projectCollections.find(({id}) => id === activeCollectionTemplateId)?.name}
                            <img src={Arrow} className="fields-item-arrow" />
                        </div>

                        {projectCollections.find(({id}) => id === activeCollectionTemplateId)?.fields
                            .filter(({type}) => type === "text")
                            .map((field) => (
                            <div onClick={() => handleClickInFieldItem(field.id)} key={field.id}>
                                {field.name}
                            </div>
                        ))}
                    </div>
                )}
                
                </div>
            ) : (<div></div>)}
        </div>
    )
}