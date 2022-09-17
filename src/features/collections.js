import { createSlice, current } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from "uuid";

const initialState = {
    collections:[],
    activeCollection: {},
    activeCollectionItem: {},

    // old
    activeProjectCollectionId: "",
    activeProjectCollectionIndex: 0,
    activeProjectCollectionItemId: "",
    activeProjectCollectionItemIndex: 0,

}

export const collectionsSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
  
        setCollections: (state,action) => {
            state.collections = action.payload
        },

        addCollection: (state,action) => {
            state.collections.push({
                id:uuidv4(),
                name: action.payload,
                slug: action.payload.toLowerCase().replaceAll(" ","-"), 
                fields:[],
                items:[],
                preRenderedHTMLNodes: [],
            });
        },

        deleteCollection: (state,action) => {
            const index = state.collections.findIndex(({id}) => id === action.payload.id);
            state.collections.splice(index,1);
        },

        editCollection: (state,action) => {
            
        },

        addCollectionItem: (state,action) => {
            
        },

        deleteCollectionItem: (state,action) => {
            
        },

        editCollectionItem: (state,action) => {
            
        },

        addCollectionField: (state,action) => {
            
        },

        deleteCollectionField: (state,action) => {
            
        },

        editCollectionField: (state,action) => {
            
        },

    }
})

export const {
    setCollections,
    addCollection,
    deleteCollection,
} = collectionsSlice.actions