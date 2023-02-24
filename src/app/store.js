import { configureStore } from '@reduxjs/toolkit'
import projectSlice from '../features/project'

export const store = configureStore({
  reducer: {
    project: projectSlice,
  },
})
