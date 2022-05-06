import { createSlice } from '@reduxjs/toolkit'
import {JSONtoCSS, getIndexOfElementInArrayByName} from "../utils/nodes-editing"

const initialState = {
  preRenderedHTMLNodes: [],
  preRenderedStyles: [],
  postRenderedStyles: "",
  activeNodeId: "",
  activeStyleName: "",
  activeStyleIndex: 0,
}

export const preRenderedNodesSlice = createSlice({
  name: 'preRenderedNodes',
  initialState,
  reducers: {
    setPreRenderedHTMLNodes: (state, action) => {
        state.preRenderedHTMLNodes = action.payload
    },
    addNodeToRenderedHTMLNodesAsLastElement: (state, action) => {
        state.preRenderedHTMLNodes = [...state.preRenderedHTMLNodes, action.payload]
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
        let styleProperty = action.payload[1];
        let styleValue = action.payload[1];

        tempPreRenderedStyles[state.activeStyleIndex].styles.font_size = styleValue;

        state.preRenderedStyles = tempPreRenderedStyles;
        state.postRenderedStyles = JSONtoCSS([...state.preRenderedStyles]);
    },

    setActiveNodeAndStyle: (state, action) => {
        state.activeNodeId = action.payload[0]
        state.activeStyleName = action.payload[1]
        state.activeStyleIndex = getIndexOfElementInArrayByName(state.preRenderedStyles, state.activeStyleName)
    },

    setActiveStyle: (state, action) => {
        state.activeStyleName = action.payload
        state.activeStyleIndex = getIndexOfElementInArrayByName(state.preRenderedStyles, state.activeStyleName)
    },
    // Add next reducers here
  }
})



export const {setPreRenderedHTMLNodes, editTextByIdInPreRenderedHTMLNode, deleteNodeByIdInPreRenderedHTMLNodes, addNodeToRenderedHTMLNodesAsLastElement, setPreRenderedStyles, editStyleByNameInPreRenderedStyles, setActiveNodeAndStyle, setActiveStyle, editStyleInPreRenderedStyles } = preRenderedNodesSlice.actions

export default preRenderedNodesSlice.reducer