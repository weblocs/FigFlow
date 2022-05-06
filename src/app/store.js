import { configureStore } from '@reduxjs/toolkit'
import preRenderedNodesSlice from '../features/pre-rendered-html-nodes'

export const store = configureStore({
  reducer: {
    designerProjectState: preRenderedNodesSlice,
  },
})