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
    }
});

export const { setProjectImages, addImageToProjectImages } = projectImagesSlice.actions
export default projectImagesSlice.reducer