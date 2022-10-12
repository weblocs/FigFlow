import React, { useState } from "react"; 
import { useSelector, useDispatch } from "react-redux";
import {editHtmlNode} from "../../../features/project";
import CMSFieldNodeConnector from "./CMSFieldNodeConnector";
import NodeRepeatableSettings from "./NodeRepeatableSettings";
import StylePanelTitle from "../style-panel/StylePanelTitle"
import Arrow from '../../../img/arrow-down.svg';

export default function ProjectSettingsPanel() {
    
    const dispatch = useDispatch()

    const activeRightSidebarTab = useSelector((state) => state.project.activeRightSidebarTab)
    const activeNodeId = useSelector((state) => state.project.activeNodeId)
    const collections = useSelector((state) => state.project.collections)
    const activeNodeObject = useSelector((state) => state.project.activeNodeObject)
    const isNodeCmsEditable = useSelector((state) => (state.project.activeNodeObject?.cmsFieldId !== undefined && state.project.activeNodeObject?.cmsFieldId !== ""));

    const isNodeCollection = useSelector((state) => {
        const parentPath = state.project.activeNodeParentsPath;
        return (parentPath[parentPath.length - 1]?.type === "col");
    })

    const isNodeInCollection = useSelector((state) => {
        const parentPath = state.project.activeNodeParentsPath;
        for(let i = 0; i < parentPath.length; i++) {
            if(parentPath[i]?.type === "col") {
                return true
            }
        }
        return false
    })

    const activeCollectionId = useSelector((state) => {
        const parentPath = state.project.activeNodeParentsPath;
        for(let i = parentPath.length - 1; i >= 0; i--) {
            if(parentPath[i]?.type === "col") {
                return parentPath[i]?.cmscollectionid
            }
        }
    })

    const activeCollectionNodeId = useSelector((state) => {
        const parentPath = state.project.activeNodeParentsPath;
        for(let i = parentPath.length - 1; i >= 0; i--) {
            if(parentPath[i]?.type === "col") {
                return parentPath[i]?.id
            }
        }
    })

    const activeCollectionItems = useSelector((state) => state.project.collections?.find(({id}) => id === activeCollectionId)?.items);

    function handleClickInCollectionItem (collectionId) {
        dispatch(editHtmlNode({id:activeCollectionNodeId, field:'cmsCollectionId', value:collectionId}));
    }

    function handleClickInFieldItem(fieldId) {
        dispatch(editHtmlNode({id:activeNodeId, field:'cmsFieldId', value:fieldId}));
    }

    function handleCheckboxClick() {
        if(isNodeCmsEditable) {
            dispatch(editHtmlNode({id:activeNodeId, field:'cmsFieldId', value:""}));
        } else {
            dispatch(editHtmlNode({id:activeNodeId, field:'cmsFieldId', value:activeCollectionItems[0].data[0].fieldId}));
        }
    }

    if(activeRightSidebarTab === "Settings") {
    return (
        <div className={"projectSettingsPanel active"}>
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
                    <div>In Collection: {collections.find(({id}) => id === activeCollectionId)?.name} </div>
                    <div>Field:  {collections.find(({id}) => id === activeCollectionId)?.fields
                    .find(({id}) => id === activeNodeObject?.cmsFieldId)?.name}</div>
                </div>

                <div className="style-panel-box">
                    <div style={{marginBottom: "6px",lineHeight:"11px"}}>Collections:</div>

                    <div className="fields-select_list">
                    {collections.map((collection) => (
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
                            Get text from {collections.find(({id}) => id === activeCollectionId)?.name}
                            <img src={Arrow} className="fields-item-arrow" />
                        </div>

                        <div className="fields-select_list">
                        {collections.find(({id}) => id === activeCollectionId)?.fields
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
                    <div>In Collection:  {collections.find(({id}) => id === activeCollectionId).name}</div>
                    <div>Field:  {collections.find(({id}) => id === activeCollectionId).fields.filter(({type}) => type === "img").find(({id}) => id === activeNodeObject?.cmsFieldId)?.name}</div>
                </div>

                <div>Fields:</div>
                {collections.find(({id}) => id === activeCollectionId).fields
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
}