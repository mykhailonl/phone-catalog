import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import cn from 'classnames';

import { RootState } from '../../store';
import {
  setNextSlide,
  setAutoPlay,
  setIsAnimating,
  setCurrentIndex,
} from '../../features/slider/sliderSlice';

import { Slide } from '../Slide/Slide';
import { Dots } from '../Dots';
import { SliderButton } from '../SliderButton';

/*
Slider component plan:

  1. containers for the slides and navigation dots
  2. Tailwind to style the slider
  3. Create a state to track the current active slide
  4. Set up the initial state and update logic
  5. Implement functions to navigate between slides when 
    clicking "next" and "previous" buttons
  6. Ensure the "next" button shows the first image after 
    the last one, and the "previous" button shows the last image before the first one
  7. Implement a timer to change slides automatically every 5 seconds using setInterval
  8. Create navigation dots below the slides that allow selecting a specific slide
  9. Ensure the dots update to reflect the current active slide
  10. Add smooth transition animations between slides
  11. Ensure seamless transition from the last slide back to the first and vice versa

  Optional improvements:
    - Implement functionality to pause the automatic slide change when the mouse hovers
        over the slider.
*/

const ANIMATION_DURATION = 700;

export const Slider = () => {
  const dispatch = useDispatch();
  const { currentIndex, slides, interval, autoPlay, isAnimating } = useSelector(
    (state: RootState) => state.slider,
  );

  // auto-slide every interval
  useEffect(() => {
    if (autoPlay) {
      const timer = setInterval(() => {
        dispatch(setNextSlide());
      }, interval);

      return () => clearInterval(timer);
    }
  }, [autoPlay, dispatch, interval]);

  useEffect(() => {
    if (isAnimating) {
      setTimeout(() => {
        dispatch(setIsAnimating(false));

        if (currentIndex === slides.length - 1) {
          requestAnimationFrame(() => {
            dispatch(setCurrentIndex(1));
          });
        } else if (currentIndex === 0) {
          requestAnimationFrame(() => {
            dispatch(setCurrentIndex(slides.length - 2));
          });
        }
      }, ANIMATION_DURATION);
    }
  }, [isAnimating, currentIndex, slides.length, dispatch]);

  return (
    <div
      className="grid-cols-mobile md:grid-cols-tablet lg:grid-cols-desktop md:px-content-md gap-16px grid"
      onMouseEnter={() => dispatch(setAutoPlay(false))}
      onMouseLeave={() => dispatch(setAutoPlay(true))}
    >
      {/* <div className="col-span-full flex items-center justify-between">
        <p>{`Current index: ${currentIndex}`}</p>
        <p>{`Slide length: ${slides.length}`}</p>
      </div> */}

      <SliderButton direction="left" />

      <div className="relative col-span-full grid aspect-square w-full overflow-hidden md:col-start-2 md:col-end-[-2]">
        <div
          className={cn(`flex h-full`)}
          style={{
            transition: isAnimating
              ? `transform ${ANIMATION_DURATION}ms`
              : 'none',
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="h-full w-full flex-shrink-0"
              style={{
                width: '100%',
              }}
            >
              <Slide image={slide.image} id={slide.id} link={slide.link} />
            </div>
          ))}
        </div>
      </div>

      <SliderButton direction="right" />

      <div className="col-span-full mt-2 flex justify-center">
        <Dots />
      </div>
    </div>
  );
};
