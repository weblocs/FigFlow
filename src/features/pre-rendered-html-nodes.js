import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  preRenderedHTMLNodes: [],
  preRenderedStyles: [],
  postRenderedStyles: ""
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

        function getIndexOfElement(nodes, name) {
            let res;
            for (let i = 0; i < nodes.length; i++) {
              if (nodes[i].name === name) {
                res = i;
              }
            }
            return res;
          }

        tempPreRenderedStyles[getIndexOfElement(tempPreRenderedStyles,activeClass)].styles.font_size = styleValue;
        state.preRenderedStyles = tempPreRenderedStyles;
        state.postRenderedStyles = JSONtoCSS([...state.preRenderedStyles]);
    },
  },
})

function JSONtoCSS (_classes) {
    return JSON.stringify(_classes)
    .replaceAll("_","-")
    .replaceAll("[","")
    .replaceAll("]","")
    .replaceAll('"',"")
    .replaceAll('{name:',".")
    .replaceAll(',styles:',"")
    .replaceAll("}},","}")
    .replaceAll("}}","}")
    .replaceAll(",",";");
}

export const {setPreRenderedHTMLNodes, editTextByIdInPreRenderedHTMLNode, deleteNodeByIdInPreRenderedHTMLNodes, addNodeToRenderedHTMLNodesAsLastElement, setPreRenderedStyles, editStyleByNameInPreRenderedStyles } = preRenderedNodesSlice.actions

export default preRenderedNodesSlice.reducer