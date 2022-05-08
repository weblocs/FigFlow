import { createSlice } from '@reduxjs/toolkit'
import {JSONtoCSS, getIndexOfElementInArrayByName} from "../utils/nodes-editing"
import { v4 as uuidv4 } from "uuid";

const initialState = {
  preRenderedHTMLNodes: [],
  preRenderedStyles: [],
  postRenderedStyles: "",
  activeNodeId: "",
  hoveredNodeId: "",
  activeStyleName: "",
  activeStyleIndex: 0,
  stylesInActiveNode: []
}

export const preRenderedNodesSlice = createSlice({
  name: 'preRenderedNodes',
  initialState,
  reducers: {
    setPreRenderedHTMLNodes: (state, action) => {
        state.preRenderedHTMLNodes = action.payload
    },

    addNodeToRenderedHTMLNodesAfterActiveNode: (state, action) => {
        let response;
        let tempPreRenderedHTMLNodes = JSON.stringify(state.preRenderedHTMLNodes);
        let activeNodeId = state.activeNodeId;

        let newNode = {
            id: uuidv4(),
            title: "Default text",
            type: action.payload,
            children: [],
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
    },

    editTextByIdInPreRenderedHTMLNode: (state,action) => {
        let response;
        let tempPreRenderedHTMLNodes = JSON.stringify(state.preRenderedHTMLNodes);
        let editedNodeId = action.payload[0];
        let editedNodeNewText = action.payload[1];

        function findNode(nodes, id) {
            for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].id === id) {
                tempPreRenderedHTMLNodes = tempPreRenderedHTMLNodes.replace(
                JSON.stringify(nodes[i]),
                JSON.stringify(nodes[i]).replace(nodes[i].title, editedNodeNewText)
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

    addPreRenderedStyle: (state, action) => {
        let newStyle = {name: action.payload, styles: {}};
        state.preRenderedStyles = [...state.preRenderedStyles, newStyle];
    },

    setPreRenderedStyles: (state,action) => {
        state.preRenderedStyles = [...action.payload];
        state.postRenderedStyles = JSONtoCSS([...state.preRenderedStyles]);
    },

    editStyleByNameInPreRenderedStyles: (state, action) => {
        let tempPreRenderedStyles = JSON.stringify(state.preRenderedStyles);
        tempPreRenderedStyles = JSON.parse(tempPreRenderedStyles);
        let activeClass = action.payload[0];
        let styleValue = action.payload[1];

        tempPreRenderedStyles[getIndexOfElementInArrayByName(tempPreRenderedStyles,activeClass)].styles.font_size = styleValue;
        state.preRenderedStyles = tempPreRenderedStyles;
        state.postRenderedStyles = JSONtoCSS([...state.preRenderedStyles]);
    },

    editStyleInPreRenderedStyles: (state, action) => {
        let tempPreRenderedStyles = JSON.stringify(state.preRenderedStyles);
        tempPreRenderedStyles = JSON.parse(tempPreRenderedStyles);

        let styleProperty = action.payload[0];
        let styleValue = action.payload[1];


        tempPreRenderedStyles[state.activeStyleIndex].styles [styleProperty] = styleValue;

        state.preRenderedStyles = tempPreRenderedStyles;
        state.postRenderedStyles = JSONtoCSS([...state.preRenderedStyles]);
    },

    setActiveNodeAndStyle: (state, action) => {
        state.activeNodeId = action.payload[0]
        state.activeStyleName = action.payload[1]
        state.activeStyleIndex = getIndexOfElementInArrayByName(state.preRenderedStyles, state.activeStyleName)
        

        // Setting stylesInActiveNode
        let response;
        function findNode(nodes, id) {
            for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].id === id) {
                response = nodes[i].class;
                break;
            }
            if (nodes[i].children) {
                findNode(nodes[i].children, id);
            }
            }
        }

        findNode(state.preRenderedHTMLNodes, state.activeNodeId);
        state.stylesInActiveNode = response;
        

    },

    setActiveStyle: (state, action) => {
        state.activeStyleName = action.payload
        state.activeStyleIndex = getIndexOfElementInArrayByName(state.preRenderedStyles, state.activeStyleName)
    },

    connectStyleWithNode: (state, action) => {
        let response = [];
        let tempPreRenderedHTMLNodes = JSON.stringify(state.preRenderedHTMLNodes);
        let nodeId = state.activeNodeId;
        let styleName = action.payload;
        let isItNewStyle = true;

        state.preRenderedStyles.map((style) => {
            if(style.name === styleName) {
                isItNewStyle = false;
            }
        });

        let newStyleToConnectWithNodes = { name: styleName, id: uuidv4() };
        let newStyleToConnectWithStyles = { name: styleName, id: uuidv4(), styles: [] };

        if(isItNewStyle) {
            state.preRenderedStyles = [...state.preRenderedStyles, newStyleToConnectWithStyles];
        }

        function findNode(nodes, id) {
            for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].id === id) {
                tempPreRenderedHTMLNodes = tempPreRenderedHTMLNodes.replace(
                JSON.stringify(nodes[i]),
                JSON.stringify(nodes[i]).replace('"class":' + JSON.stringify(nodes[i].class), '"class":' +  JSON.stringify([...nodes[i].class, newStyleToConnectWithNodes]))
                );
                response = [[...nodes[i].class, newStyleToConnectWithNodes], JSON.parse(tempPreRenderedHTMLNodes)];
                break;
            }
            if (nodes[i].children) {
                findNode(nodes[i].children, id);
            }
            }
        }
        findNode(state.preRenderedHTMLNodes, nodeId);
        state.stylesInActiveNode = response[0];
        state.preRenderedHTMLNodes = response[1];

        
    },

    setHoveredNodeId: (state,action) => {
        state.hoveredNodeId = action.payload;
    }
    // Add next reducers here
  }
})



export const {setHoveredNodeId, addNodeToRenderedHTMLNodesAfterActiveNode, connectStyleWithNode, addPreRenderedStyle, setPreRenderedHTMLNodes, editTextByIdInPreRenderedHTMLNode, deleteNodeByIdInPreRenderedHTMLNodes, setPreRenderedStyles, editStyleByNameInPreRenderedStyles, setActiveNodeAndStyle, setActiveStyle, editStyleInPreRenderedStyles } = preRenderedNodesSlice.actions

export default preRenderedNodesSlice.reducer