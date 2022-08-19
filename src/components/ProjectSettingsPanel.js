import React, { useState } from "react"; 
import { useSelector, useDispatch } from "react-redux";
import {editSelectedFieldInPreRenderedHTMLNode, updateProjectSymbol} from "../features/pre-rendered-html-nodes";
import CMSFieldNodeConnector from "./CMSFieldNodeConnector";
import NodeRepeatableSettings from "./NodeRepeatableSettings";
import StylePanelTitle from "./style-panel/StylePanelTitle"
import Arrow from '../img/arrow-down.svg';

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
    let _isNodeInCollection = false;

    let activeCollectionId = "";
    let _activeCollectionId = "";

    let _elementIdAfterActiveCollection = "";

    let _isNodeSymbol = false;
    let isNodeSymbol = false;

    let isNodeInSymbol = false;
    let _isNodeInSymbol = false;

    let activeSymbolId = "";
    let _activeSymbolId = "";

    let activeSymbolNodes = [];
    let _activeSymbolNodes = [];

    let _elementIdAfterActiveSymbol = "";

    function findNode(nodes, id) {
        for (let i = 0; i < nodes.length; i++) {

            if(_elementIdAfterActiveCollection === nodes[i].id) {
                _isNodeInCollection = false;
            }

            if(_elementIdAfterActiveSymbol === nodes[i].id) {
                _isNodeInSymbol = false;
            }

            if (nodes[i].id === id) {

                activeNode = nodes[i];

                if(_isNodeCollection && _isNodeInCollection) {
                    isNodeInCollection = true;
                    activeCollectionId = _activeCollectionId;
                }

                if(_isNodeSymbol && _isNodeInSymbol) {
                    isNodeInSymbol = true;
                    activeSymbolId = _activeSymbolId;
                    activeSymbolNodes = _activeSymbolNodes;
                }

                if(nodes[i].type === "col") {
                    isNodeCollection = true;
                    activeCollectionId = nodes[i].cmsCollectionId;
                } else {
                    isNodeCollection = false;
                }

                if(nodes[i].type === "sym") {
                    isNodeSymbol = true;
                    activeSymbolId = nodes[i].symbolId;
                } else {
                    isNodeSymbol = false;
                }
            }
            

            if(nodes[i].type === "col") {
                _isNodeInCollection = true;
                _isNodeCollection = true;
                _activeCollectionId = nodes[i].cmsCollectionId;

                if(i <= nodes.length) {
                    _elementIdAfterActiveCollection = nodes[i+1]?.id;
                }
            }

            if(nodes[i].type === "sym") {
                _isNodeInSymbol = true;
                _isNodeSymbol = true;
                _activeSymbolId = nodes[i].symbolId;
                _activeSymbolNodes = nodes[i].children;

                if(i <= nodes.length) {
                    _elementIdAfterActiveSymbol = nodes[i+1]?.id;
                }

            }
            
            if (nodes[i].children) {
                findNode(nodes[i].children, id);
            }
        }
    }

    findNode(preRenderedHTMLNodes,activeNodeId);


    function handleClickInCollectionItem (collectionId) {
        dispatch(editSelectedFieldInPreRenderedHTMLNode({id:activeNodeId, field:'cmsCollectionId', value:collectionId}));
    }

    function handleClickInFieldItem(fieldId) {
        dispatch(editSelectedFieldInPreRenderedHTMLNode({id:activeNodeId, field:'cmsFieldId', value:fieldId}));
    }

    return (
        <div className={"projectSettingsPanel "+ ((activeRightSidebarTab === "Settings") ? "active" : "" )}>

            <div className="style-panel-box sticky">
                <div className="style-panel-title-box"><div className="text">{activeNode?.type} settings</div></div>
            </div>


            {(isNodeCollection || isNodeInCollection) && (
            <StylePanelTitle title="Collection Settings" />
            )}
            
            <div>
            {(isNodeCollection) && (
            <div>
                <div className="style-panel-box">
                    <div style={{marginBottom: "6px",lineHeight:"11px"}}>Collections:</div>

                    <div className="fields-select_list">
                    {projectCollections.map((collection) => (
                        <div className={"fields-select_item" + ((activeNodeObject?.cmsCollectionId === collection.id) ? " active" : "")}
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
                        <div>In Collection: {projectCollections.find(({id}) => id === activeCollectionId).name} </div>
                        <div>Field:  {projectCollections.find(({id}) => id === activeCollectionId).fields
                        .find(({id}) => id === activeNodeObject?.cmsFieldId)?.name}</div>
                    </div>

                    <div className="style-panel-box">

                        <div className="fields-select">
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