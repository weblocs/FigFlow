import { createSlice, current } from '@reduxjs/toolkit'
import {JSONtoCSS, getIdOfPreRenderedStyleByName, getIndexOfElementInArrayById, setStylesInActiveNodeAndActiveStyle} from "../utils/nodes-editing"
import { v4 as uuidv4 } from "uuid";

import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { firebaseConfig } from "../utils/firebase-config.js";

const initialState = {
  projectMode: "developer", // developer or creator
  activeProjectTab: "",
  activeRightSidebarTab: "Style",
  projectPages: [],
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
  activeNodeStyles: {},
  hoveredNodeId: "",
  arrowNavigationOn: true,
  activeStyleObject:  {},
  activeStyleId: "",
  activeStyleName: "",
  activeStyleIndex: 0,
  stylesInActiveNode: [],
  projectFirebaseId: "",
  saveButtonStateText: "Save",
  copiedNodes: {},
  copiedSectionNodes: {},
  isActiveNodeParentDisplayStyleFlex: false,
  activeProjectResolution: "1",
  activeProjectResolutionStylesListName: "styles",
  activeNodeParentsPath: [], 
  projectUploadedFonts: [{name:"Plus Jakarta"}, {name:"Inter", weights: ["300", "500", "700"]}, {name:"General Sans"}, {name:"Hauora"}, {name:"Clash Display"}, {name:"Roboto"}],
  projectSwatches: [],
  projectSections: [],
  activeSectionFolder: "",
  projectPopUp: "",
  hoveredSectionId: "",
  projectRichTextElements: [],
  activeStyleOptionIndex: 0,
  activeNodeComputedStyles: {},
}

export const preRenderedNodesSlice = createSlice({
  name: 'preRenderedNodes',
  initialState,
  reducers: {

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

    setActiveNodeRepeatableState: (state,action) => {
        function findNode(nodes, id) {
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].id === id) {
                    nodes[i].repeatable = action.payload;
                    break;
                }
                if (nodes[i].children) {
                    findNode(nodes[i].children, id);
                }
            }
        }
        findNode(state.preRenderedHTMLNodes, state.activeNodeId);
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
        if(state.arrowNavigationOn) {
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
        state.projectMode = action.payload
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

    setProjectSections: (state, action) => {
        state.projectSections = action.payload
    },

    setActiveSectionFolder: (state, action) => {
        state.activeSectionFolder = action.payload
    },

    createNewSection: (state, action) => {
        for (let i = 0; i < state.projectSections.length; i++) {
            if(state.projectSections[i].id === state.activeSectionFolder) {
                state.projectSections[i].items = [...state.projectSections[i].items, {
                    id: uuidv4(),
                    name: action.payload,
                    preRenderedHTMLNodes: state.activeNodeObject,
                }];
            }
        }
    },

    deleteSection: (state, action) => {
        let sectionId = action.payload.id;
        for (let i = 0; i < state.projectSections.length; i++) {
            for (let j = 0; j < state.projectSections[i].items.length; j++) {
                if(state.projectSections[i].items[j].id === sectionId) {
                    state.projectSections[i].items.splice(j,1);
                }
            }
        }
    }, 

    createNewSectionFolder: (state, action) => {
        state.projectSections = [...state.projectSections, {
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

    updatePreRenderedNodesWithParentPaths: (state) => {
        function findNode(nodes, id, parent) {
            for (let i = 0; i < nodes.length; i++) {
                // nodes[i].parent = parent;
                if(nodes[i].children.length > 0) {
                    findNode(nodes[i].children, id, nodes[i]);
                }
            }
        }
        findNode(state.preRenderedHTMLNodes, state.activeNodeId, {});
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
        
        
        // function setUpParentsPath(node) {
        //     let nodeName = node?.class[0]?.name;
        //     (nodeName === undefined) && (nodeName = node?.type);

        //     if(node !== {}) {
        //         state.activeNodeParentsPath.push({id: nodeName});
        //         if(node?.parent !== undefined) {
        //             setUpParentsPath(node.parent);
        //         }
        //     }
        // }
        
        // setUpParentsPath(state.activeNodeObject)
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
        if(state.arrowNavigationOn) {
            state.copiedNodes = state.activeNodeObject
        }
    },

    deleteActiveNode: (state) => {
        function findNode(nodes) {
            for (let i = 0; i < nodes.length; i++) {
                if(nodes[i].id === state.activeNodeId) {
                    if(nodes[i+1]) {
                        state.activeNodeId = nodes[i+1].id
                    } else if(nodes[i-1]) {
                        state.activeNodeId = nodes[i-1].id
                    }
                    nodes = nodes.splice(i,1);
                    break;
                }
                
                if (nodes[i].children) {
                    findNode(nodes[i].children);
                }
            }
        }
        if(state.arrowNavigationOn) {
            findNode(state.preRenderedHTMLNodes);
        }
    },

    pasteCopiedNodes: (state, action) => {

        function editCopiedNodesIds(nodes) {
            nodes.id = uuidv4();
            for (let i = 0; i < nodes.children.length; i++) {
                nodes.children[i].id = uuidv4();
                
                if (nodes.children[i].children.length > 0) {
                    editCopiedNodesIds(nodes.children[i]);
                }
            }
        }
        editCopiedNodesIds(state.copiedNodes);

        function findNode(nodes, id) {
            function nodeIsFolder(node) {
                if(node.type === "div" || node.type === "l" || node.type === "sym" || node.type === "sec" || node.type === "rich") {
                    return true;
                } else if(node.type === "col" && node.cmsCollectionId) {
                    return true;
                } else {
                    return false;
                }
            }
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].id === id) {
                    if(nodeIsFolder(nodes[i]) && (nodes[i].children.length == 0)) {
                        nodes[i].children.splice(i+1,0,state.copiedNodes);
                    } else {
                        nodes.splice(i+1,0,state.copiedNodes)
                    }
                    break;
                }
                if (nodes[i].children) {
                    findNode(nodes[i].children, id);
                }
            }
        }
        if(state.arrowNavigationOn) {
            findNode(state.preRenderedHTMLNodes, state.activeNodeId);
        }
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
        if(state.arrowNavigationOn) {
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
            function nodeIsFolder(node) {
                if(node.type === "div" || node.type === "l" || node.type === "sym" || node.type === "rich") {
                    return true;
                } else if(node.type === "col" && node.cmsCollectionId) {
                    return true;
                } else {
                    return false;
                }
            }
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

        state.stylesInActiveNode.splice(tempStyleIndex, 1);

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
        console.log(current(state.preRenderedStyles));
    },

    setActiveNodeAndStyle: (state, action) => {
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
            console.log("we have class");
            console.log(current(state.stylesInActiveNode));

            state.preRenderedStyles.forEach((style) => {
                if(style.id === state.stylesInActiveNode[0].id) {
                    console.log(current(state.preRenderedStyles.find(({id}) => id === style.id)));

                    state.preRenderedStyles.find(({id}) => id === style.id).childrens.push({id: uuidv4(), options: [newStyleToConnectWithStyles] } );

                }
            });

        } else {
            console.log("empty class list");
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

        console.log(current(state.preRenderedStyles));
        
        
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
        
        state.projectPages[state.activePageIndex].preRenderedHTMLNodes = state.preRenderedHTMLNodes;
        state.projectPages.forEach((page) => {
            function findNode(nodes, id) {
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i].class[0]?.id === mainStyleId) {
                        
                        nodes[i].class.forEach((cl) => {
                            console.log(cl.name);
                        })
                        console.log("ok");

                        nodes[i].class.splice(childrenIndex+1, 1);
                    }
                    if (nodes[i].children) {
                        findNode(nodes[i].children, id);
                    }
                }
            }
            findNode(page.preRenderedHTMLNodes, mainStyleId); 
        });
        state.preRenderedHTMLNodes = state.projectPages[state.activePageIndex].preRenderedHTMLNodes;
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

        if(state.arrowNavigationOn) {
            findNode(state.preRenderedHTMLNodes, state.activeNodeId); 
            state.activeNodeId = response;
            [state.stylesInActiveNode, state.activeStyleName, state.activeStyleId] = setStylesInActiveNodeAndActiveStyle(state.preRenderedHTMLNodes,state.activeNodeId);
            state.activeStyleIndex = getIndexOfElementInArrayById(state.preRenderedStyles,state.activeStyleId);
        }
    },

    setArrowNavigationOn: (state, action) => {
        state.arrowNavigationOn = action.payload;
    },

    setProjectFirebaseId: (state, action) => {
        state.projectFirebaseId = action.payload;
    },

    setProjectPages: (state, action) => {
        state.projectPages = action.payload;
        state.preRenderedHTMLNodes = state.projectPages[state.activePageIndex].preRenderedHTMLNodes;
        // add setActivePageIndex here
        state.activePageId = state.projectPages[state.activePageIndex].pageId;
    },
    setProjectCollections: (state, action) => {
        state.projectCollections = action.payload;
        if(state.projectCollections.length > 0) {
            state.activeProjectCollectionId = state.projectCollections[state.activeProjectCollectionIndex].id;
            state.activeProjectCollectionItemId = state.projectCollections[state.activeProjectCollectionIndex].items[state.activeProjectCollectionItemIndex].id;
        }
    },

    saveProjectToFirebase: (state) => {
        async function saveProjectToFirebasePreRenderedNodesAndStyles() {
            const app = initializeApp(firebaseConfig);
            const db = getFirestore(app);
            await updateDoc(doc(db, "projects", state.projectFirebaseId), {
              pages: state.projectPages,
              collections: state.projectCollections,
              preRenderedStyles: state.preRenderedStyles,
              symbols: state.projectSymbols,
              swatches: state.projectSwatches,
              sections: state.projectSections,
              richTextElements: state.projectRichTextElements,
            });
        } 

        state.projectPages[state.activePageIndex].preRenderedHTMLNodes = state.preRenderedHTMLNodes;
        saveProjectToFirebasePreRenderedNodesAndStyles(); 
    },
    setSaveButtonStateText: (state,action) => {
        state.saveButtonStateText = action.payload;
    },
    setActivePageIdAndIndex: (state, action) => {
        //update previos page before creating a new one
        state.projectPages[state.activePageIndex].preRenderedHTMLNodes = state.preRenderedHTMLNodes;
        // change page
        state.activePageId = action.payload;
        state.activePageIndex = state.projectPages.map(x => {
            return x.pageId;
        }).indexOf(state.activePageId);
        // render the new page
        state.preRenderedHTMLNodes = state.projectPages[state.activePageIndex].preRenderedHTMLNodes;
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
    createNewPageInProject: (state, action) => {
        //update previos page before creating a new one
        state.projectPages[state.activePageIndex].preRenderedHTMLNodes = state.preRenderedHTMLNodes;
        // create new page
        let newPageName = action.payload;
        let newPageSlug = newPageName.toLowerCase().replaceAll(" ","-");
        let newPageId = uuidv4()
        let newPage = {
            pageName: newPageName, 
            pageSlug: newPageSlug,
            pageId: newPageId, 
            preRenderedHTMLNodes:[]
        }
        state.projectPages = [...state.projectPages, newPage];
        //navigate to the new page
        state.activePageId = newPageId;
        state.activePageIndex = state.projectPages.map(x => {
            return x.pageId;
        }).indexOf(state.activePageId);
        state.preRenderedHTMLNodes = state.projectPages[state.activePageIndex].preRenderedHTMLNodes;
        state.activeNodeId = "";

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
        // console.log(current(state.projectPages))
    },

    createNewCollection: (state, action) => {
        state.projectCollections = [...state.projectCollections, 
            {
                id:uuidv4(),
                name:action.payload, 
                slug:action.payload.toLowerCase().replaceAll(" ","-"), 
                fields:[],
                items:[],
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
        let newId = uuidv4();
        let activeCollectionItems = state.projectCollections[state.activeProjectCollectionIndex].items;
        activeCollectionItems = [...activeCollectionItems, 
            {
                id:newId,
                name:action.payload,
                data:[]
            }
        ];

        state.projectCollections[state.activeProjectCollectionIndex].items = activeCollectionItems;
        
        state.activeProjectCollectionItemId = newId;
        state.activeProjectCollectionItemIndex = activeCollectionItems.map(x => {
            return x.id;
        }).indexOf(state.activeProjectCollectionItemId);

    },
    editActiveCollectionItemData: (state, action) => {
        action.payload.map((item) => {
            let fieldExistInList = false;
            state.projectCollections[state.activeProjectCollectionIndex].items[state.activeProjectCollectionItemIndex]?.data.find(function(value, index) {
                if(value.fieldId === item.fieldId) {
                    fieldExistInList = true;
                    state.projectCollections[state.activeProjectCollectionIndex].items[state.activeProjectCollectionItemIndex].data[index].fieldValue = item.fieldValue;
                }
              });

              if(!fieldExistInList) {
                state.projectCollections[state.activeProjectCollectionIndex].items[state.activeProjectCollectionItemIndex].data = [
                    ...state.projectCollections[state.activeProjectCollectionIndex].items[state.activeProjectCollectionItemIndex].data,
                    { fieldId: item.fieldId, fieldValue: item.fieldValue}
                ];
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

export const {setActiveNodeRepeatableState, updatePreRenderedNodesWithParentPaths, deletePropertyInPreRenderedStyle, setActiveNodeComputedStyles, deleteStyleOption, setActiveStyleOptionIndex, setStyleOptionInActiveNode, createNewStyleOption, setActiveStyle, createNewStyle, movePreRenderedNode, setProjectPopUp, setRichTextElements, createNewRichTextElement, setProjectMode, setHoveredSectionId, deleteSection, setCopiedSectionNodes, setActiveSectionFolder, addSectionToPreRenderedHTMLNodes, setProjectSections, createNewSection, createNewSectionFolder, setProjectSwatches, addSwatch, updateSwatch, setActiveNodeParentsPath, updateActiveStyle, setActiveProjectResolution, checkIfActvieNodeParentDispayStyleIsFlex, deleteActiveNode, setCopiedNodes, pasteCopiedNodes, addSymbolToPreRenderedHTMLNodesAfterActiveNode, updateProjectSymbol, setProjectSymbols, createNewSymbol, setActiveNodeObject,setSaveButtonStateText,editSelectedFieldInPreRenderedHTMLNode, setActiveRightSidebarTab,editActiveCollectionItemData, setActiveCollectionItemIdAndIndex,createNewCollectionItems,createNewCollectionField, setActiveCollectionIdAndIndex,setProjectCollections, createNewCollection, setActiveProjectTab, setActivePageIdAndIndex, createNewPageInProject, saveProjectToFirebase, setProjectPages, setProjectFirebaseId, setArrowNavigationOn,deleteStyleFromStylesInActiveNode, arrowActiveNodeNavigation, setHoveredNodeId, addNodeToRenderedHTMLNodesAfterActiveNode, connectStyleWithNode, addPreRenderedStyle, setPreRenderedHTMLNodes, deleteNodeByIdInPreRenderedHTMLNodes, setPreRenderedStyles, setActiveNodeAndStyle, setActiveStyleId, editStyleInPreRenderedStyles } = preRenderedNodesSlice.actions
export default preRenderedNodesSlice.reducer