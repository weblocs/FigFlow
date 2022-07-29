import { createSlice, current } from '@reduxjs/toolkit'
import {JSONtoCSS, getIdOfPreRenderedStyleByName, getIndexOfElementInArrayById, setStylesInActiveNodeAndActiveStyle} from "../utils/nodes-editing"
import { v4 as uuidv4 } from "uuid";

import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { firebaseConfig } from "../utils/firebase-config.js";

const initialState = {
  offlineMode: true,
  offlineProjectName: "projekt1", 
  projectMode: "developer", // developer or creator
  projectLayouts: [],
  nodesEditMode: "page", // page, layout, cmsTemplate, richElement
  activeLayoutFolder: "",
  activeLayoutId: "", 
  undoStates: [],
  activeUndoIndex: 1,
  undoActionActive: false,
  activeProjectTab: "Navigator",
  activeRightSidebarTab: "Style",
  projectPages: [],
  projectPageFolders: [],
  projectPageFolderStructure: [],
  openedSettingsPage : {},
  activePageId: "",
  activePageIndex: 0, 
  projectCollections:[],  
  activeProjectCollectionId: "",
  activeProjectCollectionIndex: 0,
  activeProjectCollectionItemId: "",
  activeProjectCollectionItemIndex: 0,
  projectSymbols: [],
  preRenderedHTMLNodes: [],
  preRenderedStyles: [],
  postRenderedStyles: "",
  activeNodeId: "",
  activeNodeObject: {},
  hoveredNodeId: "",
  keyboardNavigationOn: true,
  activeStyleObject:  {}, // activeStyleProperties
  activeStyleId: "",
  activeStyleName: "",
  activeStyleIndex: 0,
  stylesInActiveNode: [],
  projectFirebaseId: "",
  saveButtonStateText: "Save",
  copiedNodes: {},
  dragableCopiedNodes: {},
  draggedOverNodeId: "",
  draggedBefore: false,
  copiedSectionNodes: {},
  isActiveNodeParentDisplayStyleFlex: false,
  activeProjectResolution: "1",
  activeProjectResolutionStylesListName: "styles",
  activeNodeParentsPath: [], 
  projectUploadedFonts: [{name:"Plus Jakarta"}, {name:"Inter", weights: ["300", "500", "700"]}, {name:"General Sans"}, {name:"Hauora"}, {name:"Clash Display"}, {name:"Roboto"}],
  projectSwatches: [],
  projectPopUp: "",
  hoveredSectionId: "",
  projectRichTextElements: [],
  activeStyleOptionIndex: 0,
  activeNodeComputedStyles: {},
  activeCollectionTemplateId: "",
  draggedPage: {},
  dragOverPage: {},
  collectionPanelState: "collections",
}

function findActiveNode(nodes, id) {
    let response;
    function findNode(_nodes) {
        for (let i = 0; i < _nodes?.length; i++) {
            if(_nodes[i].id === id) {
                response = _nodes[i];
            }
            if(_nodes[i].children?.length > 0) {
                findNode(_nodes[i].children);
            }
        }
    }  
    findNode(nodes);
    return response;
} 

function findActiveNodeSiblingArrayAndIndex(nodes, id) {
    let response;
    function findNode(_nodes) {
        for (let i = 0; i < _nodes?.length; i++) {
            if(_nodes[i].id === id) {
                response = [_nodes[i], _nodes, i];
            }
            if(_nodes[i]?.children?.length > 0) {
                findNode(_nodes[i].children);
            }
        }
    }  
    findNode(nodes);
    return response;
} 

function regenerateIdsInNodes(nodes) {
    nodes.id = uuidv4();
    for (let i = 0; i < nodes.children.length; i++) {
        nodes.children[i].id = uuidv4();
        
        if (nodes.children[i].children.length > 0) {
            regenerateIdsInNodes(nodes.children[i]);
        }
    }
}

function nodeIsFolder(node) {
    if(node.type === "div" || node.type === "l" || node.type === "sym" || node.type === "sec" || node.type === "rich") {
        return true;
    } else if(node.type === "col" && node.cmsCollectionId) {
        return true;
    } else {
        return false;
    }
}



function updateNodesLists (state) {
    if(state.nodesEditMode === "page") {
        state.projectPages[state.activePageIndex].preRenderedHTMLNodes = state.preRenderedHTMLNodes;
    } else if (state.nodesEditMode === "layout") {
       state.projectLayouts.find(({id}) => id === state.activeLayoutFolder).items.find(({id}) => id === state.activeLayoutId).preRenderedHTMLNodes = state.preRenderedHTMLNodes[0];
    } else if (state.nodesEditMode === "cmsTemplate") {
        state.projectCollections.find(({id}) => id === state.activeCollectionTemplateId).preRenderedHTMLNodes = state.preRenderedHTMLNodes;
    }  else if (state.nodesEditMode === "richElement") {
        
    }
}

function updateNodesBasedOnList(state) {
    if(state.nodesEditMode === "page") {
        state.preRenderedHTMLNodes = state.projectPages[state.activePageIndex].preRenderedHTMLNodes;
    } else if (state.nodesEditMode === "layout") {
        state.preRenderedHTMLNodes = [state.projectLayouts.find(({id}) => id === state.activeLayoutFolder).items.find(({id}) => id === state.activeLayoutId).preRenderedHTMLNodes];
    } else if (state.nodesEditMode === "cmsTemplate") {
        state.preRenderedHTMLNodes = state.projectCollections.find(({id}) => id === state.activeCollectionTemplateId).preRenderedHTMLNodes;
    } else if (state.nodesEditMode === "richElement") {
        state.projectRichTextElements
    }
}

function updateNodesListsBeforeGlobalChange(state, fx) {

    updateNodesLists(state);

    state.projectPages.forEach((page) => {
        fx(page.preRenderedHTMLNodes);
    });

    state.projectLayouts.forEach((folder) => {
        folder.items.forEach((layout) => {
            fx([layout.preRenderedHTMLNodes]);
        });
    });

    updateNodesBasedOnList(state);
    
}

export const preRenderedNodesSlice = createSlice({
  name: 'preRenderedNodes',
  initialState,
  reducers: {

    setCollectionPanelState: (state, action) => {
        state.collectionPanelState = action.payload;
    },

    updateProjectPageProperty: (state, action) => {
        state.projectPages.find(({id}) => id === state.openedSettingsPage.id)[action.payload.property] = action.payload.value;
        let [settingsOpenedPage, settingsOpenedPageSiblingArray, settingsOpenedPageIndex] = findActiveNodeSiblingArrayAndIndex(state.projectPageFolderStructure,state.openedSettingsPage.id);
        settingsOpenedPage[action.payload.property] = action.payload.value;
        state.openedSettingsPage = {};
    },

    setOpenedSettingsPage: (state, action) => {
        state.openedSettingsPage = action.payload;
    },

    setDraggedPage: (state, action) => {
        state.draggedPage = action.payload;
    },

    setDragOverPage: (state, action) => {
        state.dragOverPage = action.payload;
    },

    moveDraggedPaged: (state) => {
        let [draggedFromPage, draggedFromPageSiblingArray, draggedFromPageIndex] = findActiveNodeSiblingArrayAndIndex(state.projectPageFolderStructure,state.draggedPage.id);
        let [draggedToPage, draggedToPageSiblingArray, draggedToPageIndex] = findActiveNodeSiblingArrayAndIndex(state.projectPageFolderStructure,state.dragOverPage.id);

        

        draggedFromPageSiblingArray.splice(draggedFromPageIndex, 1);
        if(draggedToPage?.children) {
            draggedToPage.children.push(draggedFromPage);
            draggedToPage.expanded = true;

        } else {
            draggedToPageSiblingArray.splice(draggedToPageIndex+1, 0, draggedFromPage);
        }
        state.draggedPage = "";
        state.dragOverPage = "";
    },

    toggleFolderExpandedState: (state, action) => {
        const folderId = action.payload;
        let activeFolder = findActiveNode(state.projectPageFolderStructure,folderId);
        let expandedState = ((activeFolder?.expanded) ? true : false);
        activeFolder.expanded = !expandedState;
        console.log(current(state.projectPageFolderStructure));
    },

    setNodesEditMode: (state, action) => {
        state.nodesEditMode = action.payload;
    },

    setActiveCollectionTemplateId: (state, action) => {
        state.activeCollectionTemplateId = action.payload;
    },

    setActiveLayoutId: (state, action) => {
        state.activeLayoutId = action.payload;
        state.activeNodeId = "";
    },

    setDraggedBefore: (state, action) => {
        state.draggedBefore = action.payload;
    },

    setDraggedOverNodeId: (state, action) => {
        state.draggedOverNodeId = action.payload;
    },

    setDragableCopiedNodes: (state, action) => {
        const dragedNodeId = action.payload;
        state.dragableCopiedNodes = findActiveNode(state.preRenderedHTMLNodes, dragedNodeId);
    },

    setActiveNodeComputedStyles: (state) => {
        if(state.activeNodeId !== "") {
            try {
                let activeNode = document.querySelector(`[el_id="${state.activeNodeId}"]`);
                state.activeNodeComputedStyles = {
                    grid_template_columns: getComputedStyle(activeNode)?.["grid-template-columns"],
                    display: getComputedStyle(activeNode)?.display,
                    opacity: getComputedStyle(activeNode)?.opacity,
                    position: getComputedStyle(activeNode)?.position,
                };
            } catch {
            }
        }
    },

    renameMainStyle: (state, action) => {
        const nodeId = action.payload.id;
        const newNodeName = action.payload.name;
        for (let i = 0; i < state.preRenderedStyles.length; i++) {
            let node = state.preRenderedStyles[i];
            if(node.id === nodeId) {
                node.name = newNodeName;
            }
        }

        function updateNodes(nodes, id) {
            for (let i = 0; i < nodes.length; i++) {
                for(let j = 0; j < nodes[i].class.length; j++) {
                    if(nodes[i].class[j]?.id === nodeId) {
                        nodes[i].class[j].name = newNodeName;
                    }
                }
                if (nodes[i].children) {
                    updateNodes(nodes[i].children, id);
                }
            }
        }

        updateNodesListsBeforeGlobalChange(state, updateNodes);
        state.postRenderedStyles = JSONtoCSS([...state.preRenderedStyles], state.activeProjectResolution);
        state.stylesInActiveNode[0].name = newNodeName;
    },

    clearStyleOption: (state,action) => {
        let optionIndex = action.payload.optionIndex;
        let activeNode = findActiveNode(state.preRenderedHTMLNodes,state.activeNodeId);
        activeNode.class[optionIndex+1] = {id: "", name: ""}
        state.stylesInActiveNode[optionIndex+1] = {id: "", name: ""};

    },

    deleteStyleSubOption: (state, action) => {
        let optionIndex = action.payload.optionIndex;
        let subOptionId = action.payload.subOptionId;

        let mainStyleId = state.stylesInActiveNode[0].id;
        let options = state.preRenderedStyles.find(({id}) => id ===  mainStyleId).childrens[optionIndex].options;

        if(options.length > 1) {
            for (let i = 0; i < options.length; i++) {
                if (options[i].id === subOptionId) {
                    options.splice(i, 1);
                }
            }

            function updateNodes(nodes, id) {
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i].class[0]?.id === mainStyleId) {
                        nodes[i]?.class.map((option) => {
                            if(option.id === subOptionId) {
                                option.id = "";
                                option.name = "";
                            }
                        });
                    }
                    if (nodes[i].children) {
                        updateNodes(nodes[i].children, id);
                    }
                }
            }

            updateNodesListsBeforeGlobalChange(state, updateNodes);
            state.postRenderedStyles = JSONtoCSS([...state.preRenderedStyles], state.activeProjectResolution);
    
            for (let i = 0; i < state.stylesInActiveNode.length; i++) {
                if(state.stylesInActiveNode[i].id === subOptionId) {
                    state.stylesInActiveNode[i] = {id: "", name: ""};
                }
            }
        }
    },

    setActiveNodeRepeatableState: (state,action) => {
        let activeNode = findActiveNode(state.preRenderedHTMLNodes,state.activeNodeId);
        activeNode.repeatable = action.payload;
    },

    setActiveStyleOptionIndex: (state, action) => {
        state.activeStyleOptionIndex = action.payload;
    },

    movePreRenderedNode: (state, action) => {
        let moveReverse = action.payload.moveReverse;
        function findNode(nodes, id) {
            for (let i = 0; i < nodes.length; i++) {
                let new_index = i+1;
                if (moveReverse) { new_index = i - 1 };
                if (nodes[i].id === id) {
                    let indexCondition = (new_index > nodes.length);
                    // if (moveReverse) { indexCondition = (new_index > 0) }
                    if (indexCondition) {
                        var k = new_index - nodes.length + 1;
                        while (k--) {
                            nodes.push(undefined);
                        }
                    }
                    nodes.splice(new_index, 0, nodes.splice(i, 1)[0]);
                    break;
                }
                if (nodes[i].children) {
                    findNode(nodes[i].children, id);
                }
            } 
        }
        if(state.keyboardNavigationOn) {
            findNode(state.preRenderedHTMLNodes, state.activeNodeId);
        }
    },

    setHoveredSectionId: (state, action) => {
        state.hoveredSectionId = action.payload;
    },

    setProjectPopUp: (state, action) => {
        state.projectPopUp = action.payload;
    },

    setProjectMode: (state, action) => {
        state.projectMode = action.payload;
        if(state.projectMode === "creator") {
            if(state.nodesEditMode === "layout") {
                state.nodesEditMode = "page";
                state.activePageId = state.projectPages[0].id;
                state.activePageIndex = 0;
                state.preRenderedHTMLNodes = state.projectPages[0].preRenderedHTMLNodes;
            }
            state.activeProjectTab = "";
        }
    },

    setRichTextElements: (state, action) => {
        state.projectRichTextElements = action.payload
    },

    

    createNewRichTextElement: (state, action) => {
        state.projectRichTextElements = [...state.projectRichTextElements, {
            id: uuidv4(),
            name: action.payload,
            preRenderedHTMLNodes: state.activeNodeObject,
        }];
    },

    setprojectLayouts: (state, action) => {
        state.projectLayouts = action.payload
    },

    setactiveLayoutFolder: (state, action) => {
        state.activeLayoutFolder = action.payload
    },

    createNewSection: (state, action) => {
        for (let i = 0; i < state.projectLayouts.length; i++) {
            if(state.projectLayouts[i].id === state.activeLayoutFolder && state.activeNodeId !== "") {
                state.projectLayouts[i].items = [...state.projectLayouts[i].items, {
                    id: uuidv4(),
                    name: action.payload,
                    preRenderedHTMLNodes: state.activeNodeObject,
                }];
            }
        }
    },

    deleteSection: (state, action) => {
        let sectionId = action.payload.id;
        for (let i = 0; i < state.projectLayouts.length; i++) {
            for (let j = 0; j < state.projectLayouts[i].items.length; j++) {
                if(state.projectLayouts[i].items[j].id === sectionId) {
                    state.projectLayouts[i].items.splice(j,1);
                }
            }
        }
    }, 

    createNewSectionFolder: (state, action) => {
        state.projectLayouts = [...state.projectLayouts, {
            id: uuidv4(),
            name: action.payload,
            items: [],
        }]
    },

    setProjectSwatches: (state, action) => {
        state.projectSwatches = action.payload;
    },

    updateSwatch: (state, action) => {
        let swatchId = action.payload.id;
        let swatchIndex = state.projectSwatches.map(x => {
            return x.id;
          }).indexOf(swatchId);
        state.projectSwatches[swatchIndex] = action.payload;
    },

    addSwatch: (state, action) => {
        state.projectSwatches.push({id: uuidv4(), name: action.payload.name, color: action.payload.color })
    },

    setActiveNodeParentsPath: (state) => {

        function isElement(element) {
            return element instanceof Element || element instanceof HTMLDocument;  
        }

        state.activeNodeParentsPath = [];
        
        let elementBase = document.getElementsByClassName('navigation-node active')[0];
        
        if(state.activeNodeId !== "") {
            while (isElement(elementBase)) {
                if(elementBase?.getAttribute("nodeid") !== null) {
                    state.activeNodeParentsPath.unshift({ name: elementBase?.getAttribute("nodename"), id: elementBase?.getAttribute("nodeid")});
                }
                elementBase = elementBase?.parentNode?.parentNode?.childNodes[0];
            }
        }

        let parentPathIndex = 0;
        function findNode(nodes) {
            for(let i = 0; i < nodes.length; i++) {
                if(nodes[i].id === state.activeNodeParentsPath?.[parentPathIndex]?.id) {
                    nodes[i].expanded = true;
                    parentPathIndex++;
                    findNode(nodes[i].children);
                }
            }
        }
        findNode(state.preRenderedHTMLNodes);
    },



    addUndoState: (state) => {
        if(state.preRenderedHTMLNodes.length > 0 && !state.undoActionActive) {
            
            if(state.activeUndoIndex > 1) {
                state.activeUndoIndex = 1;
            }
            
            state.undoStates = [...state.undoStates, {
                preRenderedHTMLNodes: state.preRenderedHTMLNodes,
                preRenderedStyles: state.preRenderedStyles
            }];
        }
    },

    reUndoProject: (state) => {
        if(state.activeUndoIndex > 1) {
            state.activeUndoIndex--;
            state.undoActionActive = true;
            const activeUndoNode = state.undoStates[state.undoStates.length - state.activeUndoIndex];
            state.preRenderedHTMLNodes = activeUndoNode.preRenderedHTMLNodes;
            state.preRenderedStyles = activeUndoNode.preRenderedStyles;
        }
    },

    undoProject: (state) => {
            if(state.undoStates.length > state.activeUndoIndex + 1) {
                state.activeUndoIndex++;
                state.undoActionActive = true;
                const activeUndoNode = state.undoStates[state.undoStates.length - state.activeUndoIndex];
                state.preRenderedHTMLNodes = activeUndoNode.preRenderedHTMLNodes;
                state.preRenderedStyles = activeUndoNode.preRenderedStyles;    
            }
    },

    setActionActiveFalse: (state) => {
        state.undoActionActive = false;
    },

    setActiveProjectResolution: (state, action) => {
        state.activeProjectResolution = action.payload;

        (state.activeProjectResolution === "1") && (
            state.activeProjectResolutionStylesListName = "styles"
        );
        (state.activeProjectResolution === "2") && (
            state.activeProjectResolutionStylesListName = "tabletStyles"
        );
        (state.activeProjectResolution === "3") && (
            state.activeProjectResolutionStylesListName = "portraitStyles"
        );
        (state.activeProjectResolution === "4") && (
            state.activeProjectResolutionStylesListName = "mobileStyles"
        );
        
        state.postRenderedStyles = JSONtoCSS([...state.preRenderedStyles], state.activeProjectResolution);
    },

    setCopiedNodes: (state) => {
        if(state.keyboardNavigationOn) {
            state.copiedNodes = state.activeNodeObject
        }
    },

    deleteActiveNode: (state) => {
        if(state.keyboardNavigationOn) {
            let [activeNode, activeNodeSiblingArray, activeNodeIndex] = findActiveNodeSiblingArrayAndIndex(state.preRenderedHTMLNodes,state.activeNodeId);
            if(activeNodeSiblingArray[activeNodeIndex+1]) {
                state.activeNodeId = activeNodeSiblingArray[activeNodeIndex+1].id
            } else if(activeNodeSiblingArray[activeNodeIndex-1]) {
                state.activeNodeId = activeNodeSiblingArray[activeNodeIndex-1].id
            }
            activeNodeSiblingArray = activeNodeSiblingArray.splice(activeNodeIndex,1);
        }
    },

    pasteCopiedNodes: (state) => {

        regenerateIdsInNodes(state.copiedNodes);
        let [activeNode, activeNodeSiblingArray, activeNodeIndex] = findActiveNodeSiblingArrayAndIndex(state.preRenderedHTMLNodes,state.activeNodeId);

        if(state.keyboardNavigationOn) {
            if(nodeIsFolder(activeNode) && (activeNode.children.length == 0)) {
                activeNode.children.splice(activeNodeIndex+1,0,state.copiedNodes);
            } else {
                activeNodeSiblingArray.splice(activeNodeIndex+1,0,state.copiedNodes)
            }
        }
    },

    pasteDraggedNodes: (state) => {
        let stopAction = false;
        function deleteOldNode(nodes) {
            for (let i = 0; i < nodes.length; i++) {

                if(state.dragableCopiedNodes.id === state.draggedOverNodeId) {
                    stopAction = true;
                    break;
                }

                if(nodes[i].id === state.dragableCopiedNodes.id && state.draggedOverNodeId !== "") {
                    nodes.splice(i,1);
                    break;
                }
                
                if (nodes[i]?.children?.length > 0) {
                    deleteOldNode(nodes[i].children);
                }
            }
        }
        

        function findNode(nodes, id) {

            for (let i = 0; i < nodes.length; i++) {

                if (nodes[i].id === id) {
                    
                    if(nodeIsFolder(nodes[i])) {
                        if(state.draggedBefore) {
                            nodes.splice(i,0,state.dragableCopiedNodes);
                            break;
                        } else {
                            nodes[i].children.splice(0,0,state.dragableCopiedNodes);
                            break;
                        }
                    } else {
                        if(state.draggedBefore) {
                            nodes.splice(i,0,state.dragableCopiedNodes);
                            break;
                        } else {
                            nodes.splice(i+1,0,state.dragableCopiedNodes);
                            break;
                        }
                    }
                }
                if (nodes[i].children) {
                    findNode(nodes[i].children, id);
                }
            }
        }

        deleteOldNode(state.preRenderedHTMLNodes);
        if(!stopAction) {
            findNode(state.preRenderedHTMLNodes, state.draggedOverNodeId);
        }
        state.dragableCopiedNodes = {};
        state.draggedOverNodeId = "";
    },

    setCopiedSectionNodes: (state, action) => {
        state.copiedSectionNodes = action.payload;
    },

    addSectionToPreRenderedHTMLNodes: (state) => {

        function editSectionNodesIds(nodes) {
            nodes.id = uuidv4();
            for (let i = 0; i < nodes.children.length; i++) {
                nodes.children[i].id = uuidv4();
                
                if (nodes.children[i].children.length > 0) {
                    editSectionNodesIds(nodes.children[i]);
                }
            }
        }
        editSectionNodesIds(state.copiedSectionNodes);

        function findNode(nodes, id) {
            
            function nodeIsSection(node) {s
                if(node.type === "sec") {
                    return true;
                } else {
                    return false;
                }
            }
            function nodeIsRichText(node) {
                if(node.type === "rich") {
                    return true;
                } else {
                    return false;
                }
            }


            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].id === id) {
                    if(nodeIsRichText(nodes[i])) {
                        nodes[i].children.push(state.copiedSectionNodes);
                    }  else  {
                        nodes.splice(i+1,0,state.copiedSectionNodes);
                    }
                    break;
                }
                if (nodes[i].children) {
                    findNode(nodes[i].children, id);
                }
            }
        }
        if(state.keyboardNavigationOn) {
            findNode(state.preRenderedHTMLNodes, state.activeNodeId);
        }
    },

    setPreRenderedHTMLNodes: (state, action) => {
        state.preRenderedHTMLNodes = action.payload;
    },

    setActiveNodeObject: (state) => {
        let response;
        function findNode(nodes, id) {
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].id === id) {
                    response = nodes[i];
                    break;
                }
                if (nodes[i].children) {
                    findNode(nodes[i].children, id);
                }
            }
        }
        findNode(state.preRenderedHTMLNodes, state.activeNodeId);
        state.activeNodeObject = response;
    },

    // [to-do] add posibilty to check for sub classes and rensposiveness
    checkIfActvieNodeParentDispayStyleIsFlex: (state) => {
        function findNode(nodes, parent, id) {
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].id === id) {
                    if(parent?.class?.length) {
                        parent.class.forEach((cl) => {
                            let parentClassStyle = JSON.stringify(state.preRenderedStyles.find(({id}) => id === cl.id)?.styles);
                            state.isActiveNodeParentDisplayStyleFlex = parentClassStyle?.includes('"display":"flex"');
                        });
                    } else {
                        state.isActiveNodeParentDisplayStyleFlex = false;
                    }
                    break;
                }
                if (nodes[i].children) {
                    findNode(nodes[i].children, nodes[i], id);
                }
            }
        }
        findNode(state.preRenderedHTMLNodes, [] , state.activeNodeId);
    },

    addNodeToRenderedHTMLNodesAfterActiveNode: (state, action) => {
        let response;
        let tempPreRenderedHTMLNodes = JSON.stringify(state.preRenderedHTMLNodes);
        let activeNodeId = state.activeNodeId;
        let newNodeId = uuidv4();

        let newNode = {
            id: newNodeId,
            title: "Default text",
            type: action.payload,
            children: [],
            class: []
        };

        function findNode(nodes, id) {
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].id === id) {
                    if(nodeIsFolder(nodes[i]) && (nodes[i].children.length == 0)) {
                        nodes[i].children.splice(i+1,0,newNode);
                    } else {
                        nodes.splice(i+1,0,newNode)
                    }
                    break;
                }
                if (nodes[i].children) {
                    findNode(nodes[i].children, id);
                }
            }
        }
        
        if(state.activeNodeId !== "") {
            findNode(state.preRenderedHTMLNodes, state.activeNodeId);
        } else {
            state.preRenderedHTMLNodes = [...state.preRenderedHTMLNodes, newNode];
        }
        

        // function findNode(nodes, id) {
        //     for (let i = 0; i < nodes.length; i++) {
        //     if (nodes[i].id === id) {
        //         tempPreRenderedHTMLNodes = tempPreRenderedHTMLNodes.replace(
        //         JSON.stringify(nodes[i]),
        //         JSON.stringify(nodes[i]) + "," + JSON.stringify(newNode)
        //         );
        //         response = JSON.parse(tempPreRenderedHTMLNodes);
        //         break;
        //     }
        //     if (nodes[i].children) {
        //         findNode(nodes[i].children, id);
        //     }
        //     }
        // }
        // findNode(state.preRenderedHTMLNodes, activeNodeId);
        
        // if(state.activeNodeId !== "") {
        //     state.preRenderedHTMLNodes = response;
        // } else {
        //     // add newNode as last element if activeNode is not selected
        //     state.preRenderedHTMLNodes = [...state.preRenderedHTMLNodes, newNode];
        // }  
        
        state.activeNodeId = newNodeId;
        state.stylesInActiveNode = [];
        state.activeStyleName = "";
        state.activeStyleIndex = undefined;
    },

    addSymbolToPreRenderedHTMLNodesAfterActiveNode: (state, action) => {
        let response;
        let tempPreRenderedHTMLNodes = JSON.stringify(state.preRenderedHTMLNodes);
        let activeNodeId = state.activeNodeId;
        let newNodeId = uuidv4();

        let newNode = {
            id: newNodeId,
            title: "Default text",
            type: "sym",
            symbolId: action.payload.id,
            children: state.projectSymbols.find(({id}) => id === action.payload.id).preRenderedHTMLNodes,
            class: []
        };

        function findNode(nodes, id) {
            for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].id === id) {
                tempPreRenderedHTMLNodes = tempPreRenderedHTMLNodes.replace(
                JSON.stringify(nodes[i]),
                JSON.stringify(nodes[i]) + "," + JSON.stringify(newNode)
                );
                response = JSON.parse(tempPreRenderedHTMLNodes);
                break;
            }
            if (nodes[i].children) {
                findNode(nodes[i].children, id);
            }
            }
        }

        findNode(state.preRenderedHTMLNodes, activeNodeId);
        
        if(state.activeNodeId !== "") {
            state.preRenderedHTMLNodes = response;
        } else {
            // add newNode as last element if activeNode is not selected
            state.preRenderedHTMLNodes = [...state.preRenderedHTMLNodes, newNode];
        }  
        
        state.activeNodeId = newNodeId;
        state.stylesInActiveNode = [];
        state.activeStyleName = "";
        state.activeStyleIndex = undefined;
    },

    editSelectedFieldInPreRenderedHTMLNode: (state,action) => {
        let response;
        let tempPreRenderedHTMLNodes = JSON.stringify(state.preRenderedHTMLNodes);
        let editedNodeId = action.payload.id;
        let editedNodeNewText = action.payload.value;
        let editedField = action.payload.field;

        function findNode(nodes, id) {
            for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].id === id) {
                // simple version
                // nodes[i][editedField] = editedNodeNewText;

                if(nodes[i] [editedField] === undefined) {
                    tempPreRenderedHTMLNodes = tempPreRenderedHTMLNodes.replace(
                        JSON.stringify(nodes[i]),
                        JSON.stringify(nodes[i]).replace( 
                            `"id":"${nodes[i].id}"`,
                            `"id":"${nodes[i].id}", "${editedField}":"${editedNodeNewText}" `)
                    );
                } else {
                    tempPreRenderedHTMLNodes = tempPreRenderedHTMLNodes.replace(
                        JSON.stringify(nodes[i]),
                        JSON.stringify(nodes[i]).replace( 
                            `"${editedField}":"${nodes[i] [editedField]}"`,
                            `"${editedField}":"${editedNodeNewText}"`)
                    );
                }
                response = JSON.parse(tempPreRenderedHTMLNodes);
                break;
            }
            if (nodes[i].children) {
                findNode(nodes[i].children, id);
            }
            }
        }

        
        findNode(state.preRenderedHTMLNodes, editedNodeId);
        state.preRenderedHTMLNodes = response;
    },

    deleteStyleFromStylesInActiveNode: (state,action) => {

        let deletedStyleId = action.payload.deletedStyleId;

        let tempStyleIndex = state.stylesInActiveNode.map(x => {
            return x.id;
          }).indexOf(deletedStyleId);

         // state.stylesInActiveNode.splice(tempStyleIndex, 1);
         state.stylesInActiveNode= [];

        let response;
        let tempPreRenderedHTMLNodes = JSON.stringify(state.preRenderedHTMLNodes);
        let editedNodeId = state.activeNodeId;
        

        function findNode(nodes, id) {
            for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].id === id) {
                tempPreRenderedHTMLNodes = tempPreRenderedHTMLNodes.replace(
                JSON.stringify(nodes[i]),
                JSON.stringify(nodes[i]).replace( JSON.stringify(nodes[i].class), JSON.stringify(state.stylesInActiveNode) )
                );
                response = JSON.parse(tempPreRenderedHTMLNodes);
                break;
            }
            if (nodes[i].children) {
                findNode(nodes[i].children, id);
            }
            }
        }
        findNode(state.preRenderedHTMLNodes, editedNodeId);
        state.preRenderedHTMLNodes = response;
    },


    deleteNodeByIdInPreRenderedHTMLNodes: (state,action) => {
        let response;
        let tempPreRenderedHTMLNodes = JSON.stringify(state.preRenderedHTMLNodes);
        let deletedNodeId = action.payload;

        function findNode(nodes, id) {
            for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].id === id) {
                tempPreRenderedHTMLNodes = tempPreRenderedHTMLNodes.replace("," + JSON.stringify(nodes[i]), "");
                tempPreRenderedHTMLNodes = tempPreRenderedHTMLNodes.replace(JSON.stringify(nodes[i]) + ",", "");
                tempPreRenderedHTMLNodes = tempPreRenderedHTMLNodes.replace(JSON.stringify(nodes[i]), "");
                response = JSON.parse(tempPreRenderedHTMLNodes);
                break;
            }
            if (nodes[i].children) {
                findNode(nodes[i].children, id);
            }
            }
        }

        findNode(state.preRenderedHTMLNodes, deletedNodeId);
        state.preRenderedHTMLNodes = response;
    },

    // not used (was using in first basic add style form)(missing style id)
    addPreRenderedStyle: (state, action) => {
        let newStyle = {name: action.payload, styles: {}};
        state.preRenderedStyles = [...state.preRenderedStyles, newStyle];
        state.postRenderedStyles = JSONtoCSS([...state.preRenderedStyles], state.activeProjectResolution);
    },

    setPreRenderedStyles: (state,action) => {
        state.preRenderedStyles = [...action.payload];
        state.postRenderedStyles = JSONtoCSS([...state.preRenderedStyles], state.activeProjectResolution);
    },

    editStyleInPreRenderedStyles: (state, action) => {
        let styleProperty = action.payload[0];
        let styleValue = action.payload[1];
        let styleResolution = state.activeProjectResolutionStylesListName;

        if(state.activeStyleId === state.stylesInActiveNode[0].id) {
            state.preRenderedStyles[state.activeStyleIndex][styleResolution][styleProperty] = styleValue;
        } else {
            state.preRenderedStyles.find(({id}) => id === state.stylesInActiveNode[0].id).childrens[state.activeStyleOptionIndex].options.find(({id}) => id === state.activeStyleId)[styleResolution][styleProperty] = styleValue;
        }
        
        state.postRenderedStyles = JSONtoCSS([...state.preRenderedStyles], state.activeProjectResolution);
    },

    deletePropertyInPreRenderedStyle: (state, action) => {
        let styleProperty = action.payload;
        let styleResolution = state.activeProjectResolutionStylesListName;

        if(state.activeStyleId === state.stylesInActiveNode[0].id) {
            delete state.preRenderedStyles[state.activeStyleIndex][styleResolution][styleProperty];
        } else {
            delete state.preRenderedStyles.find(({id}) => id === state.stylesInActiveNode[0].id).childrens[state.activeStyleOptionIndex].options.find(({id}) => id === state.activeStyleId)[styleResolution][styleProperty];
        }
        state.postRenderedStyles = JSONtoCSS([...state.preRenderedStyles], state.activeProjectResolution);
    },

    setActiveNodeId: (state, action) => {
        state.activeNodeId = action.payload.id;

        [state.stylesInActiveNode, state.activeStyleName, state.activeStyleId] = setStylesInActiveNodeAndActiveStyle(state.preRenderedHTMLNodes,state.activeNodeId);
        state.activeStyleIndex = getIndexOfElementInArrayById(state.preRenderedStyles,state.activeStyleId);
    },

    setActiveStyle: (state, action) => {
        state.activeStyleObject = action.payload;
    },

    updateActiveStyle: (state) => {
        if(state.activeStyleId === state.stylesInActiveNode?.[0]?.id) {
            state.activeStyleObject = state.preRenderedStyles[state.activeStyleIndex]?.[state.activeProjectResolutionStylesListName];
        } else {
            state.activeStyleObject =  state.preRenderedStyles?.find(({id}) => id === state.stylesInActiveNode?.[0]?.id)?.childrens[state.activeStyleOptionIndex]?.options.find(({id}) => id === state.activeStyleId)?.[state.activeProjectResolutionStylesListName];
        }
    },

    setActiveStyleId: (state, action) => {
        state.activeStyleId = action.payload;
        state.activeStyleIndex = getIndexOfElementInArrayById(state.preRenderedStyles, state.activeStyleId);
    },

    createNewStyle: (state, action) => {
        let nodeId = state.activeNodeId;
        let styleName = action.payload;
        let newStyleId = uuidv4();

        let newStyleToConnectWithNodes = { name: styleName, id: newStyleId };
        let newStyleToConnectWithStyles = { name: styleName, id: newStyleId, styles: {}, childrens: [], tabletStyles: {}, portraitStyles: {}, mobileStyles: {}};

        // add checking if it's a new class

        if(state.stylesInActiveNode.length > 0) {
            state.preRenderedStyles.forEach((style) => {
                if(style.id === state.stylesInActiveNode[0].id) {

                    state.preRenderedStyles.find(({id}) => id === style.id).childrens.push({id: uuidv4(), options: [newStyleToConnectWithStyles] } );

                }
            });

        } else {
            let isItNewStyle = true;
            state.preRenderedStyles.map((style) => {
                if(style.name === styleName) {
                    isItNewStyle = false;
                    newStyleToConnectWithNodes.id = style.id;
                }
            });
            if(isItNewStyle) {
                state.preRenderedStyles.push(newStyleToConnectWithStyles);
            }
        }
        
        
        function findNode(nodes, id) {
            for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].id === id) {
                nodes[i].class.push(newStyleToConnectWithNodes);
                state.stylesInActiveNode = [...nodes[i].class];
                break;
            }
            if (nodes[i].children) {
                findNode(nodes[i].children, id);
            }
            }
        }
        findNode(state.preRenderedHTMLNodes, nodeId);

        state.activeStyleName = styleName;
        state.activeStyleId = newStyleToConnectWithNodes.id;
        state.activeStyleIndex = getIndexOfElementInArrayById(state.preRenderedStyles, state.activeStyleId);
        
    },

    createNewStyleOption: (state, action) => {
        let styleOptionName = action.payload.name;
        let childrenIndex = action.payload.childrenIndex;
        let mainStyleId = state.stylesInActiveNode[0].id;
        let newStyleId = uuidv4();
        let newStyleToConnectWithStyles = { name: styleOptionName, id: newStyleId, styles: {}, tabletStyles: {}, portraitStyles: {}, mobileStyles: {}};

        state.preRenderedStyles.find(({id}) => id ===  mainStyleId).childrens[childrenIndex].options.push(newStyleToConnectWithStyles);
    },

    deleteStyleOption: (state, action) => {
        let childrenIndex = action.payload.index;
        let mainStyleId = state.stylesInActiveNode[0].id;
        state.preRenderedStyles.find(({id}) => id ===  mainStyleId).childrens.splice(childrenIndex,1);

        function updateNodes(nodes) {
            nodes.map((node) => {
                if (node.class[0]?.id === mainStyleId) {
                    node.class.splice(childrenIndex+1, 1);
                }
                if (node.children) {
                    updateNodes(node.children);
                }
            });
        }

        updateNodesListsBeforeGlobalChange(state,updateNodes);
        
    },

    setStyleOptionInActiveNode: (state, action) => {
        let index = action.payload.index + 1;
        let optionId = action.payload.id;
        let optionName = action.payload.name;

        function findNode(nodes, id) {
            for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].id === id) {
                nodes[i].class[index] = {id: optionId, name: optionName};
                
                for(let j = 0; j < index; j++) {
                    if(nodes[i].class[j]?.id === undefined) {
                        nodes[i].class[j] = {id: "", name: ""};
                    }
                }
                state.stylesInActiveNode = [...nodes[i].class];
                state.activeStyleId = optionId;
                break;
            }
            if (nodes[i].children) {
                findNode(nodes[i].children, id);
            }
            }
        }
        findNode(state.preRenderedHTMLNodes, state.activeNodeId);

    },

    connectStyleWithNode: (state, action) => {
        let nodeId = state.activeNodeId;
        let styleName = action.payload;
        let styleId = getIdOfPreRenderedStyleByName(state.preRenderedStyles, styleName, state.stylesInActiveNode);

        let isItNewStyle = true;
        let newStyleId = uuidv4();

        state.preRenderedStyles.map((style) => {
           
            if(style.name === styleName) {

                // [to-work-on] For classes with parents we have different id values in styles and nodes
                if(JSON.stringify(style.parents) === JSON.stringify(state.stylesInActiveNode)) {
                    isItNewStyle = false;
                }
            }
        });

        let newStyleToConnectWithNodes = {};
        let newStyleToConnectWithStyles = { name: styleName, id: newStyleId, styles: {}, tabletStyles: {}, portraitStyles: {}, mobileStyles: {}, parents: state.stylesInActiveNode };


        if(isItNewStyle) {
            newStyleToConnectWithNodes = { name: styleName, id: newStyleId };
            state.preRenderedStyles = [...state.preRenderedStyles, newStyleToConnectWithStyles];
            state.postRenderedStyles = JSONtoCSS([...state.preRenderedStyles], state.activeProjectResolution);
        } else {
            newStyleToConnectWithNodes = { name: styleName, id: styleId };
        }

        function findNode(nodes, id) {
            for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].id === id) {
                nodes[i].class.push(newStyleToConnectWithNodes);
                state.stylesInActiveNode = [...nodes[i].class];
                break;
            }
            if (nodes[i].children) {
                findNode(nodes[i].children, id);
            }
            }
        }
        findNode(state.preRenderedHTMLNodes, nodeId);

        state.activeStyleName = styleName;
        state.activeStyleId = newStyleToConnectWithNodes.id;
        state.activeStyleIndex = getIndexOfElementInArrayById(state.preRenderedStyles, state.activeStyleId);
        
    },

    setHoveredNodeId: (state,action) => {
        state.hoveredNodeId = action.payload;
    },

    arrowActiveNodeNavigation: (state,action) => {
        let response = state.activeNodeId;
        let pressedKey = action.payload.key;
        let parentNodes = [];
        let initailNodes = state.preRenderedHTMLNodes;

        function findNode(nodes, id) {
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].id === id) {
                    if(pressedKey == "left") {
                        if(i != 0) {
                            response = nodes[i-1].id;
                        }
                    }
                    if(pressedKey == "right") {
                        if(i != (nodes.length - 1)) {
                            response = nodes[i+1].id;
                        }
                    }

                    if(pressedKey == "up") {
                        if(initailNodes !== nodes) {
                            response = parentNodes.id;
                        }
                    }

                    if(pressedKey == "down") {
                        if(nodes[i].children.length > 0) {
                            response = nodes[i].children[0].id;
                        }
                    }
                    break;
                }
                if (nodes[i].children) {
                    if(nodes[i].children.length > 0) {
                        parentNodes = nodes[i];
                    }
                    findNode(nodes[i].children, id);
                }
            }
        }

        if(state.keyboardNavigationOn) {
            findNode(state.preRenderedHTMLNodes, state.activeNodeId); 
            state.activeNodeId = response;
            [state.stylesInActiveNode, state.activeStyleName, state.activeStyleId] = setStylesInActiveNodeAndActiveStyle(state.preRenderedHTMLNodes,state.activeNodeId);
            state.activeStyleIndex = getIndexOfElementInArrayById(state.preRenderedStyles,state.activeStyleId);
        }
    },

    setKeyboardNavigationOn: (state, action) => {
        state.keyboardNavigationOn = action.payload;
    },

    setProjectFirebaseId: (state, action) => {
        state.projectFirebaseId = action.payload;
    },

    setProjectPages: (state, action) => {
        state.projectPages = action.payload;
        state.preRenderedHTMLNodes = state.projectPages[state.activePageIndex].preRenderedHTMLNodes;
        // add setActivePageIndex here
        state.activePageId = state.projectPages[state.activePageIndex].id;
    },

    setProjectCollections: (state, action) => {
        state.projectCollections = action.payload;
        if(state.projectCollections.length > 0) {
            state.activeProjectCollectionId = state.projectCollections[state.activeProjectCollectionIndex].id;
            state.activeProjectCollectionItemId = state.projectCollections[state.activeProjectCollectionIndex].items[state.activeProjectCollectionItemIndex]?.id;
        }
    },

    saveProjectToFirebase: (state) => {

        if(!state.offlineMode) {
            async function saveProjectToFirebasePreRenderedNodesAndStyles() {
                const app = initializeApp(firebaseConfig);
                const db = getFirestore(app);
                await updateDoc(doc(db, "projects", state.projectFirebaseId), {
                pages: state.projectPages,
                projectPageFolders: state.projectPageFolders,
                projectPageFolderStructure: state.projectPageFolderStructure,
                collections: state.projectCollections,
                preRenderedStyles: state.preRenderedStyles,
                symbols: state.projectSymbols,
                swatches: state.projectSwatches,
                sections: state.projectLayouts,
                richTextElements: state.projectRichTextElements,
                });
            }
            updateNodesLists(state);
            saveProjectToFirebasePreRenderedNodesAndStyles(); 
        } else {
            let slug = state.offlineProjectName;
            updateNodesLists(state);
            localStorage.setItem(slug+"pages", JSON.stringify(state.projectPages));
            localStorage.setItem(slug+"projectPageFolders", JSON.stringify(state.projectPageFolders));
            localStorage.setItem(slug+"projectPageFolderStructure", JSON.stringify(state.projectPageFolderStructure));
            localStorage.setItem(slug+"collections", JSON.stringify(state.projectCollections));
            localStorage.setItem(slug+"preRenderedStyles", JSON.stringify(state.preRenderedStyles));
            localStorage.setItem(slug+"symbols", JSON.stringify(state.projectSymbols));
            localStorage.setItem(slug+"swatches", JSON.stringify(state.projectSwatches));
            localStorage.setItem(slug+"sections", JSON.stringify(state.projectLayouts));
            localStorage.setItem(slug+"richTextElements", JSON.stringify(state.projectRichTextElements))
        }
    },
    setSaveButtonStateText: (state,action) => {
        state.saveButtonStateText = action.payload;
    },

    setActiveCmsTemplate: (state, action) => {
        updateNodesLists(state);
        state.nodesEditMode = "cmsTemplate";
        state.activeLayoutId = "";
        state.activePageId = "";

        state.activeCollectionTemplateId = action.payload;
        
        updateNodesBasedOnList(state);
        state.activeNodeId = "";
    },

    setActiveLayout: (state, action) => {
        updateNodesLists(state);
        state.nodesEditMode = "layout";
        state.activeCollectionTemplateId = "";
        state.activePageId = "";

        state.activeLayoutId = action.payload.id;
        state.activeLayoutFolder = action.payload.folderId;

        updateNodesBasedOnList(state);
        state.activeNodeId = "";
    },

    setActivePageIdAndIndex: (state, action) => {
        //update previos page before creating a new one
        updateNodesLists(state);
        state.activeLayoutId = "";
        state.activeCollectionTemplateId = "";
        state.nodesEditMode = "page";
        // change page
        state.activePageId = action.payload;
        state.activePageIndex = state.projectPages.map(x => {
            return x.id;
        }).indexOf(state.activePageId);
        // render the new page
        updateNodesBasedOnList(state);
        state.activeNodeId = "";
    },
    
    setActiveCollectionIdAndIndex: (state, action) => {
        state.activeProjectCollectionId = action.payload;
        state.activeProjectCollectionIndex = state.projectCollections.map(x => {
            return x.id;
        }).indexOf(state.activeProjectCollectionId);
        state.activeProjectCollectionItemIndex = 0;
        state.activeProjectCollectionItemId = state.projectCollections[state.activeProjectCollectionIndex].items[0]?.id;
    },
    setActiveCollectionItemIdAndIndex: (state, action) => {
        state.activeProjectCollectionItemId = action.payload;
        let activeCollectionsItems = state.projectCollections[state.activeProjectCollectionIndex].items;
        state.activeProjectCollectionItemIndex = activeCollectionsItems.map(x => {
            return x.id;
        }).indexOf(state.activeProjectCollectionItemId);
    },

    setProjectPageFolders: (state, action) => {
        state.projectPageFolders = action.payload;
    },

    setProjectPageFolderStructure: (state, action) => {
        state.projectPageFolderStructure = action.payload;
    },

    createNewPageInProject: (state, action) => {
        //update previos page before creating a new one
        updateNodesLists(state);
        state.nodesEditMode = "page";
        // create new page
        let newPageName = action.payload;
        let newPageSlug = newPageName.toLowerCase().replaceAll(" ","-");
        let newPageId = uuidv4()
        state.projectPages.push({
            name: newPageName, 
            slug: newPageSlug,
            id: newPageId, 
            preRenderedHTMLNodes:[],
        });
        state.projectPageFolderStructure.push({
            name: newPageName, 
            slug: newPageSlug,
            id: newPageId,
        });
        //navigate to the new page
        state.activePageId = newPageId;
        state.activePageIndex = state.projectPages.map(x => {
            return x.id;
        }).indexOf(state.activePageId);

        updateNodesBasedOnList(state);
        state.activeNodeId = "";
    },

    createNewPageFolder: (state, action) => {
        const folderName = action.payload;
        const folderSlug = folderName.toLowerCase().replaceAll(" ","-");
        const folder = {
            name: folderName, 
            slug: folderSlug,
            id: uuidv4(), 
            children: []
        }
        state.projectPageFolders.push(folder);
        state.projectPageFolderStructure.push(folder);

        
    },

    setProjectSymbols: (state, action) => {
        state.projectSymbols = action.payload;
    },

    createNewSymbol: (state, action) => {
        state.projectSymbols = [...state.projectSymbols, 
            {
                id: uuidv4(),
                name: action.payload,  
                preRenderedHTMLNodes: [],
            }
        ];
    },

    // add dispatch to the action using activeNodeObject

    updateProjectSymbol: (state, action) => {

        let updatedSymbolId = action.payload.id;
        let updatedSymbolNodes = action.payload.nodes;

        // update symbol root
        state.projectSymbols.find(({id}) => id === updatedSymbolId).preRenderedHTMLNodes = updatedSymbolNodes;

        // update nodes which is seleceted symbol 
        state.projectPages.forEach((page) => {
            function findNode(nodes, id) {
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i].symbolId === id) {
                        nodes[i].children = updatedSymbolNodes;
                    }
                    if (nodes[i].children) {
                        findNode(nodes[i].children, id);
                    }
                }
            }
            findNode(page.preRenderedHTMLNodes, updatedSymbolId); 
        });
    },

    createNewCollection: (state, action) => {
        state.projectCollections = [...state.projectCollections, 
            {
                id:uuidv4(),
                name:action.payload, 
                slug:action.payload.toLowerCase().replaceAll(" ","-"), 
                fields:[],
                items:[],
                preRenderedHTMLNodes: [],
            }
        ];
    },
    createNewCollectionField: (state, action) => {
        state.projectCollections[state.activeProjectCollectionIndex].fields = [...state.projectCollections[state.activeProjectCollectionIndex].fields, 
            {
                id:uuidv4(),
                name:action.payload.name,
                type:action.payload.type,
            }
        ];
    },
    createNewCollectionItems: (state, action) => {
        const collectionItemName = action.payload;
        let activeCollectionItems = state.projectCollections[state.activeProjectCollectionIndex].items;
        const collectionItemId = uuidv4();
        
        activeCollectionItems.push({
            id: collectionItemId,
            name: collectionItemName,
            slug: collectionItemName.toLowerCase().replaceAll(" ","-"),
            data:[]
        });

        state.activeProjectCollectionItemId = collectionItemId;
        
        state.activeProjectCollectionItemIndex = activeCollectionItems.map(x => {
            return x.id;
        }).indexOf(state.activeProjectCollectionItemId);

    },

    editActiveCollectionItemData: (state, action) => {
        const editedItemFieldsData = action.payload;
        editedItemFieldsData.map((item) => {

            let fieldIsEmpty = true;
            let colletionItemFields = state.projectCollections[state.activeProjectCollectionIndex].items[state.activeProjectCollectionItemIndex].data;

            colletionItemFields.map((field, index) => {
                if(field.fieldId === item.fieldId) {
                    fieldIsEmpty = false;
                    colletionItemFields[index].fieldValue = item.fieldValue;
                }
            });

            if(fieldIsEmpty) {
                colletionItemFields.push({ fieldId: item.fieldId, fieldValue: item.fieldValue});
            }
        });
    },

    setActiveProjectTab: (state, action) => {
        if(state.activeProjectTab === action.payload) {
            state.activeProjectTab = "";
        } else {
            state.activeProjectTab = action.payload;
        }
    },

    setActiveRightSidebarTab: (state, action) => {
        state.activeRightSidebarTab = action.payload;
    },
    // Add next reducers here
  }
})

export const {setCollectionPanelState, updateProjectPageProperty, setOpenedSettingsPage, setDraggedPage, setDragOverPage, moveDraggedPaged, toggleFolderExpandedState, setProjectPageFolders, setProjectPageFolderStructure, createNewPageFolder, setNodesEditMode, setActiveCmsTemplate, setActiveCollectionTemplateId, setActiveLayoutId, setActiveLayout, setDraggedBefore, setDragableCopiedNodes, setDraggedOverNodeId, pasteDraggedNodes, undoProject, reUndoProject, setActionActiveFalse, addUndoState, renameMainStyle, clearStyleOption, deleteStyleSubOption, setActiveNodeRepeatableState, deletePropertyInPreRenderedStyle, setActiveNodeComputedStyles, deleteStyleOption, setActiveStyleOptionIndex, setStyleOptionInActiveNode, createNewStyleOption, setActiveStyle, createNewStyle, movePreRenderedNode, setProjectPopUp, setRichTextElements, createNewRichTextElement, setProjectMode, setHoveredSectionId, deleteSection, setCopiedSectionNodes, setactiveLayoutFolder, addSectionToPreRenderedHTMLNodes, setprojectLayouts, createNewSection, createNewSectionFolder, setProjectSwatches, addSwatch, updateSwatch, setActiveNodeParentsPath, updateActiveStyle, setActiveProjectResolution, checkIfActvieNodeParentDispayStyleIsFlex, deleteActiveNode, setCopiedNodes, pasteCopiedNodes, addSymbolToPreRenderedHTMLNodesAfterActiveNode, updateProjectSymbol, setProjectSymbols, createNewSymbol, setActiveNodeObject,setSaveButtonStateText,editSelectedFieldInPreRenderedHTMLNode, setActiveRightSidebarTab,editActiveCollectionItemData, setActiveCollectionItemIdAndIndex,createNewCollectionItems,createNewCollectionField, setActiveCollectionIdAndIndex,setProjectCollections, createNewCollection, setActiveProjectTab, setActivePageIdAndIndex, createNewPageInProject, saveProjectToFirebase, setProjectPages, setProjectFirebaseId, setKeyboardNavigationOn,deleteStyleFromStylesInActiveNode, arrowActiveNodeNavigation, setHoveredNodeId, addNodeToRenderedHTMLNodesAfterActiveNode, connectStyleWithNode, addPreRenderedStyle, setPreRenderedHTMLNodes, deleteNodeByIdInPreRenderedHTMLNodes, setPreRenderedStyles, setActiveNodeId, setActiveStyleId, editStyleInPreRenderedStyles } = preRenderedNodesSlice.actions
export default preRenderedNodesSlice.reducer