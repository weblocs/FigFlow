import { configureStore } from '@reduxjs/toolkit'
import projectSlice from '../features/project'
import projectImagesSlice from '../features/project-images'

export const store = configureStore({
  reducer: {
    project: projectSlice,
    projectImages: projectImagesSlice,
  },
})
