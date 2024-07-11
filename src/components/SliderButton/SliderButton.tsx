import { useDispatch } from 'react-redux';
import { setNextSlide, setPrevSlide } from '../../features/slider/sliderSlice';

import styles from './SliderButton.module.scss';

type Props = {
  direction: 'left' | 'right';
};

export const SliderButton = ({ direction }: Props) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    return direction === 'left'
      ? dispatch(setPrevSlide())
      : dispatch(setNextSlide());
  };

  const { sliderButton, sliderButton__wrapper } = styles;

  return (
    <button
      className={sliderButton}
      onClick={() => {
        handleClick();
      }}
    >
      <div className={sliderButton__wrapper}>
        <img src={`/icons/${direction}-arrow.svg`} alt={`${direction}-arrow`} />
      </div>
    </button>
  );
};
