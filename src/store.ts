import { configureStore } from '@reduxjs/toolkit';
import sliderSlice from './features/slider/sliderSlice';

export const store = configureStore({
  reducer: {
    slider: sliderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
