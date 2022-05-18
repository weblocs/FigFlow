import React, { useState } from "react"; 
import { useSelector } from "react-redux";

export default function ProjectSettingsPanel() {
    const activeRightSidebarTab = useSelector((state) => state.designerProjectState.activeRightSidebarTab)
    const activeNodeId = useSelector((state) => state.designerProjectState.activeNodeId)
    const preRenderedHTMLNodes = useSelector((state) => state.designerProjectState.preRenderedHTMLNodes)
    const projectCollections = useSelector((state) => state.designerProjectState.projectCollections)

    let activeNode = {};
    let _isNodeCollection = false;
    let isNodeCollection = false;
    let isNodeInCollection = false;

    const [activeCollectionId, setActiveCollectionId] = useState("");

    function findNode(nodes, id) {
        for (let i = 0; i < nodes.length; i++) {

            if (nodes[i].id === id) {
                console.log(nodes[i]);
                activeNode = nodes[i];

                if(_isNodeCollection) {
                    isNodeInCollection = true;
                }

                if(nodes[i].type === "col") {
                    isNodeCollection = true;
                } else {
                    isNodeCollection = false;
                }
            }

            if(nodes[i].type === "col") {
                _isNodeCollection = true;
            }
            
            if (nodes[i].children) {
                findNode(nodes[i].children, id);
            }
        }
    }

    findNode(preRenderedHTMLNodes,activeNodeId);

    return (
        <div className={"projectSettingsPanel "+ ((activeRightSidebarTab === "Settings") ? "active" : "" )}>
            <div>{activeNodeId}</div>
            <div>{activeNode?.type}</div>
            <div>{activeNode?.cmsFieldId}</div>  
            <div>

            {isNodeCollection ? (
            <div>
                <div>
                    Collection: {projectCollections.find(({id}) => id === activeCollectionId)?.name}
                </div>
            Collections

            {projectCollections.map((collection)=> (
                <div onClick={() => setActiveCollectionId(collection.id)}>
                    <div>
                        {collection.name}
                    </div>
                </div>
            ))}
            </div>) 
            : ("") }

            
            </div>

            <div>{activeCollectionId}</div>
            
            <div>{isNodeInCollection ? "In Collection" : ""}</div>
        </div>
    )
}