import { configureStore } from '@reduxjs/toolkit';
import sliderSlice from './features/slider/sliderSlice';
import sideBarSlice from './features/sideBar/sideBarSlice';

export const store = configureStore({
  reducer: {
    slider: sliderSlice,
    menu: sideBarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
