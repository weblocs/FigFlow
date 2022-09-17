import React, { useState } from "react"; 
import { useSelector, useDispatch } from "react-redux";
import {editSelectedFieldInPreRenderedHTMLNode, updateProjectSymbol} from "../../../features/pre-rendered-html-nodes";
import CMSFieldNodeConnector from "./CMSFieldNodeConnector";
import NodeRepeatableSettings from "./NodeRepeatableSettings";
import StylePanelTitle from "../style-panel/StylePanelTitle"
import Arrow from '../../../img/arrow-down.svg';

export default function ProjectSettingsPanel() {
    
    const dispatch = useDispatch()

    const activeRightSidebarTab = useSelector((state) => state.designerProjectState.activeRightSidebarTab)
    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId)
    const projectCollections = useSelector((state) => state.designerProjectState.projectCollections)
    const activeNodeObject = useSelector((state) => state.designerProjectState.activeNodeObject)
    const isNodeCmsEditable = useSelector((state) => (state.designerProjectState.activeNodeObject?.cmsFieldId !== undefined && state.designerProjectState.activeNodeObject?.cmsFieldId !== ""));

    const isNodeCollection = useSelector((state) => {
        const parentPath = state.designerProjectState.activeNodeParentsPath;
        return (parentPath[parentPath.length - 1]?.type === "col");
    })

    const isNodeInCollection = useSelector((state) => {
        const parentPath = state.designerProjectState.activeNodeParentsPath;
        for(let i = 0; i < parentPath.length; i++) {
            if(parentPath[i]?.type === "col") {
                return true
            }
        }
        return false
    })

    const activeCollectionId = useSelector((state) => {
        const parentPath = state.designerProjectState.activeNodeParentsPath;
        for(let i = parentPath.length - 1; i >= 0; i--) {
            if(parentPath[i]?.type === "col") {
                return parentPath[i]?.cmscollectionid
            }
        }
    })

    const activeCollectionNodeId = useSelector((state) => {
        const parentPath = state.designerProjectState.activeNodeParentsPath;
        for(let i = parentPath.length - 1; i >= 0; i--) {
            if(parentPath[i]?.type === "col") {
                return parentPath[i]?.id
            }
        }
    })

    const activeCollectionItems = useSelector((state) => state.designerProjectState.projectCollections?.find(({id}) => id === activeCollectionId)?.items);

    function handleClickInCollectionItem (collectionId) {
        dispatch(editSelectedFieldInPreRenderedHTMLNode({id:activeCollectionNodeId, field:'cmsCollectionId', value:collectionId}));
    }

    function handleClickInFieldItem(fieldId) {
        dispatch(editSelectedFieldInPreRenderedHTMLNode({id:activeNodeId, field:'cmsFieldId', value:fieldId}));
    }

    function handleCheckboxClick() {
        if(isNodeCmsEditable) {
            dispatch(editSelectedFieldInPreRenderedHTMLNode({id:activeNodeId, field:'cmsFieldId', value:""}));
        } else {
            dispatch(editSelectedFieldInPreRenderedHTMLNode({id:activeNodeId, field:'cmsFieldId', value:activeCollectionItems[0].data[0].fieldId}));
        }
    }

    return (
        <div className={"projectSettingsPanel "+ ((activeRightSidebarTab === "Settings") ? "active" : "" )}>
            <div className="style-panel-box sticky">
                <div className="style-panel-title-box"><div className="text">{activeNodeObject?.type} settings</div></div>
            </div>

            {(isNodeCollection || isNodeInCollection) && (
            <StylePanelTitle title="Collection Settings" />
            )}
            
            <div>
            {(isNodeCollection || isNodeInCollection) && (
            <div>
                <div className="style-panel-box">
                    <div>In Collection: {projectCollections.find(({id}) => id === activeCollectionId)?.name} </div>
                    <div>Field:  {projectCollections.find(({id}) => id === activeCollectionId)?.fields
                    .find(({id}) => id === activeNodeObject?.cmsFieldId)?.name}</div>
                </div>

                <div className="style-panel-box">
                    <div style={{marginBottom: "6px",lineHeight:"11px"}}>Collections:</div>

                    <div className="fields-select_list">
                    {projectCollections.map((collection) => (
                        <div className={"fields-select_item" + ((activeCollectionId === collection.id) ? " active" : "")}
                        onClick={() => handleClickInCollectionItem(collection.id)} key={collection.id}>
                            <div>
                                {collection.name}
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>)}
            </div>

            <div>
                {(isNodeInCollection && (activeNodeObject?.type === "h" || activeNodeObject?.type === "p" )) && 
                <div>
                    <div className="style-panel-box">

                        <div className="fields-select">
                            <input type="checkbox" checked={isNodeCmsEditable} onChange={handleCheckboxClick} />
                            Get text from {projectCollections.find(({id}) => id === activeCollectionId)?.name}
                            <img src={Arrow} className="fields-item-arrow" />
                        </div>

                        <div className="fields-select_list">
                        {projectCollections.find(({id}) => id === activeCollectionId)?.fields
                            .filter(({type}) => type === "text")
                            .map((field) => (
                            <div onClick={() => handleClickInFieldItem(field.id)} key={field.id} 
                            className={"fields-select_item" + ((activeNodeObject?.cmsFieldId === field.id) ? " active" : "")}>
                                {field.name}
                            </div>
                        ))}
                    </div>
                </div>

                
                
                </div>
                }

                {(isNodeInCollection && (activeNodeObject?.type === "img" )) && 
                <div>

                <div style={{marginBottom:"20px"}}>
                    <div>In Collection:  {projectCollections.find(({id}) => id === activeCollectionId).name}</div>
                    <div>Field:  {projectCollections.find(({id}) => id === activeCollectionId).fields.filter(({type}) => type === "img").find(({id}) => id === activeNodeObject?.cmsFieldId)?.name}</div>
                </div>

                <div>Fields:</div>
                {projectCollections.find(({id}) => id === activeCollectionId).fields
                    .filter(({type}) => type === "img").map((field) => (
                    <div onClick={() => handleClickInFieldItem(field.id)} key={field.id}>
                        {field.name}
                    </div>
                ))}
                </div>
                }
                </div>

                <CMSFieldNodeConnector />
                <NodeRepeatableSettings />

        </div>
    )
}