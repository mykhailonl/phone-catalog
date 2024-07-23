import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

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

import styles from './Slider.module.scss';
const {
  slider,
  slider__content,
  slider__carousel,
  slider__carouselWrapper,
  slider__slide,
  slider__nav,
} = styles;

const ANIMATION_DURATION = 700;

export const Slider = () => {
  const dispatch = useDispatch();
  const { currentIndex, slides, interval, autoPlay, isAnimating } = useSelector(
    (state: RootState) => state.slider,
  );

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
      className={slider}
      onMouseEnter={() => dispatch(setAutoPlay(false))}
      onMouseLeave={() => dispatch(setAutoPlay(true))}
    >
      <div className={slider__content}>
        <SliderButton direction="left" />

        <div className={slider__carouselWrapper}>
          <div
            className={`${slider__carousel}`}
            style={{
              transition: isAnimating
                ? `transform ${ANIMATION_DURATION}ms`
                : 'none',
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {slides.map((slide, index) => (
              <div key={index} className={slider__slide}>
                <Slide image={slide.image} id={slide.id} link={slide.link} />
              </div>
            ))}
          </div>
        </div>

        <SliderButton direction="right" />
      </div>

      <div className={slider__nav}>
        <Dots />
      </div>
    </div>
  );
};
