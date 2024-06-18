import { Slide } from './Slide';

export type SliderState = {
  currentIndex: number;
  slides: Slide[];
  interval: number;
  autoPlay: boolean;
  isAnimating: boolean;
};
