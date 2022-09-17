import { configureStore } from '@reduxjs/toolkit'
import preRenderedNodesSlice from '../features/pre-rendered-html-nodes'
import projectImagesSlice from '../features/project-images'

export const store = configureStore({
  reducer: {
    designerProjectState: preRenderedNodesSlice,
    projectImages: projectImagesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;