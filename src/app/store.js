import { configureStore } from '@reduxjs/toolkit'
import preRenderedNodesSlice from '../features/pre-rendered-html-nodes'
import projectImagesSlice from '../features/project-images'

export const store = configureStore({
  reducer: {
    designerProjectState: preRenderedNodesSlice,
    projectImages: projectImagesSlice,
  },
})