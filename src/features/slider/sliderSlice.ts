import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliderState } from '../../types/SliderState';

const initialState: SliderState = {
  slides: [
    { id: 1, image: '/slider-images/slider-iphone-pro.webp', link: '#' },
    { id: 2, image: '/slider-images/slider-ipad.jpeg', link: '#' },
    { id: 3, image: '/slider-images/slider-apple-watch.jpeg', link: '#' },
  ],
  interval: 5000,
};

export const sliderSlice = createSlice({
  name: 'slider',
  initialState,
  reducers: {
    setSlides: (state, action: PayloadAction<SliderState['slides']>) => {
      state.slides = action.payload;
    },
    setInterval: (state, action: PayloadAction<number>) => {
      state.interval = action.payload;
    },
  },
});

export const { setSlides, setInterval } = sliderSlice.actions;
export default sliderSlice.reducer;
