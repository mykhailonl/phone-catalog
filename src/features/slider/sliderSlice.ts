import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SliderState } from '../../types/SliderState';

// TODO add actual links
// TODO change images?
// TODO do I need direction prop?

const initialState: SliderState = {
  currentIndex: 1,
  slides: [
    { id: 0, image: '/slider-images/slider-3.png', link: '#' },
    { id: 1, image: '/slider-images/slider-1.png', link: '#' },
    { id: 2, image: '/slider-images/slider-2.png', link: '#' },
    { id: 3, image: '/slider-images/slider-3.png', link: '#' },
    { id: 4, image: '/slider-images/slider-1.png', link: '#' },
  ],
  interval: 5000,
  autoPlay: false,
  isAnimating: false,
};

export const sliderSlice = createSlice({
  name: 'slider',
  initialState,
  reducers: {
    setNextSlide: (state) => {
      if (state.isAnimating) return;

      state.isAnimating = true;
      state.currentIndex += 1;
    },
    setPrevSlide: (state) => {
      if (state.isAnimating) return;

      state.isAnimating = true;
      state.currentIndex -= 1;
    },
    setAutoPlay: (state, action: PayloadAction<boolean>) => {
      state.autoPlay = action.payload;
    },
    setIsAnimating: (state, action: PayloadAction<boolean>) => {
      state.isAnimating = action.payload;
    },
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
  },
});

export const {
  setNextSlide,
  setPrevSlide,
  setAutoPlay,
  setIsAnimating,
  setCurrentIndex,
} = sliderSlice.actions;
export default sliderSlice.reducer;
