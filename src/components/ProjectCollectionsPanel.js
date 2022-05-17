import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateNewCollection from "./CreateNewCollection"
import {setActiveCollectionIdAndIndex} from "../features/pre-rendered-html-nodes"


export default function ProjectCollectionsPanel(){
    const dispatch = useDispatch()
    const projectCollections = useSelector((state) => state.designerProjectState.projectCollections)
    const activeProjectCollectionId = useSelector((state) => state.designerProjectState.activeProjectCollectionId)
    const activeProjectTab = useSelector((state) => state.designerProjectState.activeProjectTab)

    
    return(
        <div className={"projectCollectionsPanel "+ ((activeProjectTab === "Collections") ? "active" : "" )}>
            
            <div className="projectTabTitleBox">Collections</div>

            <CreateNewCollection />

            <div className="pagesList">
            {projectCollections.map((collection) => (
                <div 
                onClick={() => dispatch(setActiveCollectionIdAndIndex(collection.id))} 
                className={"projectPageItem " + ((activeProjectCollectionId === collection.id) ? "active" : "") } 
                key={collection.id}>
                    {collection.name}
                </div>
            ))}
            </div>
        </div>
    )
}