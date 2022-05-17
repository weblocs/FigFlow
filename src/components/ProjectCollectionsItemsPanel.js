import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {setActiveCollectionItemIdAndIndex} from "../features/pre-rendered-html-nodes"
import CreateNewCollectionItem from "./CreateNewCollectionItem"


export default function ProjectCollectionsItemsPanel(){
    const dispatch = useDispatch()
    const projectCollections = useSelector((state) => state.designerProjectState.projectCollections)
    const activeProjectCollectionItemId = useSelector((state) => state.designerProjectState.activeProjectCollectionItemId)
    const activeProjectCollectionIndex = useSelector((state) => state.designerProjectState.activeProjectCollectionIndex)

    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)

    let activeCollection = projectCollections[activeProjectCollectionIndex];
    
    return(
        <div className={"projectCollectionsPanel "+ ((activeProjectTab === "Collections") ? "active" : "" )}>
            
            <div className="projectTabTitleBox">{activeCollection?.name} Items</div>
            <CreateNewCollectionItem />

            <div className="pagesList">
            {activeCollection?.items.map((item) => (
                <div 
                onClick={() => dispatch(setActiveCollectionItemIdAndIndex(item.id))} 
                className={"projectPageItem " + ((activeProjectCollectionItemId === item.id) ? "active" : "") } 
                key={item.id}>
                    {item.name}
                </div>
            ))}
            </div>

        </div>
    )
}