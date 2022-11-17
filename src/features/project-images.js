import {createSlice} from '@reduxjs/toolkit'
import { v4 as uuidv4 } from "uuid";

const initialState = {
    Images: [],
}

export const projectImagesSlice = createSlice({
    name: 'preRenderedNodes',
    initialState,
    reducers: {
      setProjectImages: (state, action) => {
        state.Images = action.payload;
      },
      addImageToProjectImages: (state, action) => {
        let newImage = {
            name: action.payload,
            id: uuidv4(),
        };
        state.Images = [...state.Images, newImage];
      },
      deleteImage: (state, action) => {
        const index = state.Images.findIndex(({id}) => id === action.payload.id)
        state.Images.splice(index,1);
      },
      
    }
});

export const { setProjectImages, addImageToProjectImages, deleteImage } = projectImagesSlice.actions
export default projectImagesSlice.reducer