import { setNextSlide, setPrevSlide } from '../../features/slider/sliderSlice';

type Props = {
  direction: 'left' | 'right';
};

import styles from './SliderButton.module.scss';
import { useAppDispatch } from '../../hooks';
const { sliderButton, sliderButton__wrapper } = styles;

export const SliderButton = ({ direction }: Props) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    return direction === 'left'
      ? dispatch(setPrevSlide())
      : dispatch(setNextSlide());
  };

  return (
    <button
      className={sliderButton}
      onClick={() => {
        handleClick();
      }}
    >
      <div
        className={sliderButton__wrapper}
        style={direction === 'left' ? { transform: 'rotate(-180deg)' } : {}}
      >
        <img src={`/icons/icon-arrow.svg`} alt={`${direction}-arrow`} />
      </div>
    </button>
  );
};
