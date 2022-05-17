import { createSlice, current } from '@reduxjs/toolkit'
import {JSONtoCSS, getIdOfPreRenderedStyleByName, getIndexOfElementInArrayById, setStylesInActiveNodeAndActiveStyle} from "../utils/nodes-editing"
import { v4 as uuidv4 } from "uuid";

const initialState = {
  activeProjectId: "",
  activeProjectTab: "",
  projectPages: [],
  activePageId: "",
  activePageIndex: 0,
  projectCollections:[],
  activeProjectCollectionId: "",
  activeProjectCollectionIndex: 0,
  activeProjectCollectionItemId: "",
  activeProjectCollectionItemIndex: 0,
  preRenderedHTMLNodes: [],
  preRenderedStyles: [],
  postRenderedStyles: "",
  activeNodeId: "",
  hoveredNodeId: "",
  arrowNavigationOn: true,
  activeStyleId: "",
  activeStyleName: "",
  activeStyleIndex: 0,
  stylesInActiveNode: [],
  projectFirebaseId: ""
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
        state.postRenderedStyles = JSONtoCSS([...state.preRenderedStyles]);
    },

    setPreRenderedStyles: (state,action) => {
        state.preRenderedStyles = [...action.payload];
        state.postRenderedStyles = JSONtoCSS([...state.preRenderedStyles]);
    },

    editStyleInPreRenderedStyles: (state, action) => {
        let tempPreRenderedStyles = JSON.stringify(state.preRenderedStyles);
        tempPreRenderedStyles = JSON.parse(tempPreRenderedStyles);

        let styleProperty = action.payload[0];
        let styleValue = action.payload[1];


        tempPreRenderedStyles[state.activeStyleIndex].styles [styleProperty] = styleValue;

        state.preRenderedStyles = tempPreRenderedStyles;
        state.postRenderedStyles = JSONtoCSS([...tempPreRenderedStyles]);
    },

    setActiveNodeAndStyle: (state, action) => {


        state.activeNodeId = action.payload.id;
        
        [state.stylesInActiveNode, state.activeStyleName, state.activeStyleId] = setStylesInActiveNodeAndActiveStyle(state.preRenderedHTMLNodes,state.activeNodeId);
        state.activeStyleIndex = getIndexOfElementInArrayById(state.preRenderedStyles,state.activeStyleId);
    },

    setActiveStyleId: (state, action) => {
        state.activeStyleId = action.payload;
        state.activeStyleIndex = getIndexOfElementInArrayById(state.preRenderedStyles, state.activeStyleId);
    },

    connectStyleWithNode: (state, action) => {
        let response = [];
        let tempPreRenderedHTMLNodes = JSON.stringify(state.preRenderedHTMLNodes);
        let nodeId = state.activeNodeId;
        let styleName = action.payload;
        let styleId = getIdOfPreRenderedStyleByName(state.preRenderedStyles, styleName, state.stylesInActiveNode);


        let isItNewStyle = true;

        let newStyleId = uuidv4();

        state.preRenderedStyles.map((style) => {
           
            if(style.name === styleName) {

                // [to work on] For classes with parents we have different id values in styles and nodes


                if(JSON.stringify(style.parents) === JSON.stringify(state.stylesInActiveNode)) {
                    isItNewStyle = false;
                }
            }
        });

        let newStyleToConnectWithNodes = {};
        let newStyleToConnectWithStyles = { name: styleName, id: newStyleId, styles: {}, parents: state.stylesInActiveNode };


        if(isItNewStyle) {
            newStyleToConnectWithNodes = { name: styleName, id: newStyleId };
            state.preRenderedStyles = [...state.preRenderedStyles, newStyleToConnectWithStyles];
            state.postRenderedStyles = JSONtoCSS([...state.preRenderedStyles]);
        } else {
            newStyleToConnectWithNodes = { name: styleName, id: styleId };
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
        state.activeProjectCollectionId = state.projectCollections[state.activeProjectCollectionIndex].id;
        state.activeProjectCollectionItemId = state.projectCollections[state.activeProjectCollectionIndex].items[state.activeProjectCollectionItemIndex].id;
    },
    updateProjectPagesBeforeSaving: (state) => {
        state.projectPages[state.activePageIndex].preRenderedHTMLNodes = state.preRenderedHTMLNodes;
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
                name:action.payload,
                type:"text",
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
    setActiveProjectId: (state, action) => {
        state.activeProjectId = action.payload;
    }
    // Add next reducers here
  }
})

export const {setActiveProjectId, editActiveCollectionItemData, setActiveCollectionItemIdAndIndex,createNewCollectionItems,createNewCollectionField, setActiveCollectionIdAndIndex,setProjectCollections, createNewCollection, setActiveProjectTab, setActivePageIdAndIndex, createNewPageInProject, updateProjectPagesBeforeSaving, setProjectPages, setProjectFirebaseId, setArrowNavigationOn,deleteStyleFromStylesInActiveNode, arrowActiveNodeNavigation, setHoveredNodeId, addNodeToRenderedHTMLNodesAfterActiveNode, connectStyleWithNode, addPreRenderedStyle, setPreRenderedHTMLNodes, editTextByIdInPreRenderedHTMLNode, deleteNodeByIdInPreRenderedHTMLNodes, setPreRenderedStyles, setActiveNodeAndStyle, setActiveStyleId, editStyleInPreRenderedStyles } = preRenderedNodesSlice.actions
export default preRenderedNodesSlice.reducer