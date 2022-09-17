import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import {setActiveCollectionItemTemplateId, setActiveProjectTab} from "../../../../features/pre-rendered-html-nodes"


export default function PageChanger() {
    const nodesEditMode = useSelector((state) => state.designerProjectState.nodesEditMode);
    const activeCollectionItems = useSelector((state) => state.designerProjectState.projectCollections?.find(({id}) => id === state.designerProjectState.activeCollectionTemplateId)?.items);
    const pageChangerText = useSelector((state) => {
        const projectState = state.designerProjectState;
        if (nodesEditMode === "page") {
            return "Page: " + projectState.projectPages?.[projectState.activePageIndex]?.name;
        } 
        if (nodesEditMode === "cmsTemplate") {
            return "Template: " + projectState.projectCollections.find(({id}) => id === projectState.activeCollectionTemplateId).name;
        } 
        if (nodesEditMode === "layout") {
            return "Layout: " + 
            projectState.projectLayouts?.find(({id}) => id === projectState.activeLayoutFolder)?.items?.find(({id}) => id === projectState.activeLayoutId)?.name;
        } 
    })
    const activeTemplateCollectionItem = useSelector((state) => {
        const projectState = state.designerProjectState;
        const activeTemplateItem = activeCollectionItems?.find(({id}) => id === projectState.activeCollectionItemTemplateId);
        if(activeTemplateItem !== undefined) {
            return activeTemplateItem;
        } else {
            return activeCollectionItems?.[0];
        }
    });
    const dispatch = useDispatch()

    const [itemsChangerOpened, setItemsChangerOpened] = useState(false);

    function handleItemClick(id) {
        setItemsChangerOpened(false);
        dispatch(setActiveCollectionItemTemplateId(id))
    }

    function handleButtonClick () {
        if(nodesEditMode !== "layout") {
            dispatch(setActiveProjectTab("Pages"));
        } else {
            dispatch(setActiveProjectTab("Layouts"));
        }
    }

    return (
        <>
        <div className="page-changer" onClick={handleButtonClick}>
            {pageChangerText}
        </div>
        {(nodesEditMode === "cmsTemplate") && 
        <div className="page-changer_wrapper">
            <div className="page-changer" onClick={() => setItemsChangerOpened(!itemsChangerOpened)}>
                Item: {activeTemplateCollectionItem?.name}
            </div>
            {(itemsChangerOpened) && (
            <div className="collection-item-changer_list">
                {activeCollectionItems.map((item) => (
                    <div 
                    className={"collection-item-changer_item" + ((activeTemplateCollectionItem?.id === item.id) ? " active" : "")} 
                    onClick={() => handleItemClick(item.id)}
                    key={item.id}>
                        {item.name}
                    </div>
                ))}
            </div>
            )}
        </div>
        }
        
        </>
    )
}