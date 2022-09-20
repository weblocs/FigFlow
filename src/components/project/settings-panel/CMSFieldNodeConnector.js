import { useDispatch, useSelector } from "react-redux"
import { editSelectedFieldInPreRenderedHTMLNode } from "../../../features/pre-rendered-html-nodes";
import Arrow from '../../../img/arrow-down.svg';
import StylePanelTitle from "../style-panel/StylePanelTitle";

export default function CMSFieldNodeConnector() {
    const activeNodeObject = useSelector((state) => state.designerProjectState.activeNodeObject)
    const collections =  useSelector((state) => state.designerProjectState.collections)
    const activeNodeId =  useSelector((state) => state.designerProjectState.activeNodeId)
    const activeCollectionTemplateId =  useSelector((state) => state.designerProjectState.activeCollectionTemplateId)
    const isInTemplateEditingPage = useSelector((state) => (state.designerProjectState.nodesEditMode === "cmsTemplate"))
    const activeCmsFieldId = useSelector((state) => state.designerProjectState.activeNodeObject?.cmsFieldId)
    const isNodeCmsEditable = useSelector((state) => (state.designerProjectState.activeNodeObject?.cmsFieldId !== undefined && state.designerProjectState.activeNodeObject?.cmsFieldId !== ""));
    const activeCollectionItems = useSelector((state) => state.designerProjectState.collections?.find(({id}) => id === state.designerProjectState.activeCollectionTemplateId)?.items);
    
    const isNodeInCollection = useSelector((state) => {
        const parentPath = state.designerProjectState.activeNodeParentsPath;
        for(let i = 0; i < parentPath.length; i++) {
            if(parentPath[i]?.type === "col") {
                return true
            }
        }
        return false
    })
    
    const dispatch = useDispatch()

    function handleClickInFieldItem(id) {
        dispatch(editSelectedFieldInPreRenderedHTMLNode({id:activeNodeId, field:'cmsFieldId', value:id}));
    }

    function handleCheckboxClick() {
        if(isNodeCmsEditable) {
            dispatch(editSelectedFieldInPreRenderedHTMLNode({id:activeNodeId, field:'cmsFieldId', value:""}));
        } else {
            dispatch(editSelectedFieldInPreRenderedHTMLNode({id:activeNodeId, field:'cmsFieldId', value:activeCollectionItems[0].data[0].fieldId}));
        }
    }

    return (
        <div>
            {(isInTemplateEditingPage && !isNodeInCollection) ? (
                <>
                <StylePanelTitle title="Collection Template" />
                <div className="style-panel-box">
                
                {(activeNodeObject?.type === "h" || activeNodeObject?.type === "p") && 
                <div style={{display: "flex"}}>
                    CMS Template Editing: 
                    <input type="checkbox" checked={isNodeCmsEditable} onChange={handleCheckboxClick} />
                </div>
                }
                
                {((activeNodeObject?.type === "h" || activeNodeObject?.type === "p") && isNodeCmsEditable) && 
                (
                    <div>
                        <div className="fields-select">
                            Get text from {collections.find(({id}) => id === activeCollectionTemplateId)?.name}
                            <img src={Arrow} className="fields-item-arrow" />
                        </div>
                        <div className="fields-select_list">
                            {collections.find(({id}) => id === activeCollectionTemplateId)?.fields
                                .filter(({type}) => type === "text")
                                .map((field) => (
                                <div onClick={() => handleClickInFieldItem(field.id)} key={field.id} 
                                className={"fields-select_item" + ((activeCmsFieldId === field.id) ? " active" : "")}>
                                    {field.name}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                </div>
                </>
            ) : (<div></div>)}
        </div>
    )
}