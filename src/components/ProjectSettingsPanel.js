import React, { useState, useEffect } from "react"; 
import { useSelector, useDispatch } from "react-redux";
import {editSelectedFieldInPreRenderedHTMLNode, setActiveNodeObject} from "../features/pre-rendered-html-nodes";

export default function ProjectSettingsPanel() {
    
    
    const dispatch = useDispatch()

    const activeRightSidebarTab = useSelector((state) => state.designerProjectState.activeRightSidebarTab)
    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId)
    const preRenderedHTMLNodes = useSelector((state) => state.designerProjectState.preRenderedHTMLNodes)
    const projectCollections = useSelector((state) => state.designerProjectState.projectCollections)
    const activeNodeObject = useSelector((state) => state.designerProjectState.activeNodeObject)


    let activeNode = {};
    let _isNodeCollection = false;
    let isNodeCollection = false;
    let isNodeInCollection = false;
    let activeCollectionId = "";
    let _activeCollectionId = "";
    


    // zbiera zawsze stare dane [DO ZMIANY]
    useEffect(() => {
        dispatch(setActiveNodeObject());
        // console.log("activeNodeObject");
        // console.log(activeNodeObject);
    },[activeNodeId]);

    

    function findNode(nodes, id) {
        for (let i = 0; i < nodes.length; i++) {

            if (nodes[i].id === id) {
                // console.log(nodes[i]);
                activeNode = nodes[i];

                if(_isNodeCollection) {
                    isNodeInCollection = true;
                    activeCollectionId = _activeCollectionId;
                }

                if(nodes[i].type === "col") {
                    isNodeCollection = true;
                    activeCollectionId = nodes[i].cmsCollectionId;
                } else {
                    isNodeCollection = false;
                }
            }

            if(nodes[i].type === "col") {
                _isNodeCollection = true;
                _activeCollectionId = nodes[i].cmsCollectionId;
            }
            
            if (nodes[i].children) {
                findNode(nodes[i].children, id);
            }
        }
    }

    findNode(preRenderedHTMLNodes,activeNodeId);


    function handleClickInCollectionItem (collectionId) {
        dispatch(editSelectedFieldInPreRenderedHTMLNode({id:activeNodeId, field:'cmsCollectionId', value:collectionId}));
        dispatch(setActiveNodeObject());
    }

    function handleClickInFieldItem(fieldId) {
        dispatch(editSelectedFieldInPreRenderedHTMLNode({id:activeNodeId, field:'cmsFieldId', value:fieldId}));
        dispatch(setActiveNodeObject());
    }

    return (
        <div className={"projectSettingsPanel "+ ((activeRightSidebarTab === "Settings") ? "active" : "" )}>
            
            <div>{activeNode?.type}</div> 
            <div>

            {(isNodeCollection) ? (
            <div style={{marginBottom:"20px"}}>
                <div>
                    Collection: {projectCollections.find(({id}) => id === activeNodeObject?.cmsCollectionId)?.name}
                </div>
            Collections

            {projectCollections.map((collection) => (
                <div onClick={() => handleClickInCollectionItem(collection.id)} key={collection.id}>
                    <div>
                        {collection.name}
                    </div>
                </div>
            ))}
            </div>) 
            : ("") }

            
            </div>

            
            
            <div>{(isNodeInCollection && (activeNodeObject?.type === "h" || activeNodeObject?.type === "p" )) ? ( 
                <div>

                <div style={{marginBottom:"20px"}}>
                    <div>In Collection:  {projectCollections.find(({id}) => id === activeCollectionId).name}</div>
                    <div>Field:  {projectCollections.find(({id}) => id === activeCollectionId).fields.find(({id}) => id === activeNodeObject?.cmsFieldId)?.name}</div>
                </div>
                
                <div>Fields:</div>
                {projectCollections.find(({id}) => id === activeCollectionId).fields.map((field) => (
                    <div onClick={() => handleClickInFieldItem(field.id)} key={field.id}>
                        {field.name}
                    </div>
                ))}
                
                </div>
                ) : ""}</div>
        </div>
    )
}