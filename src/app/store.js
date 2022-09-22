import { configureStore } from '@reduxjs/toolkit'
import projectSlice from '../features/project'
import projectImagesSlice from '../features/project-images'

export const store = configureStore({
  reducer: {
    project: projectSlice,
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