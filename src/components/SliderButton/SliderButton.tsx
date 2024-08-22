import React from 'react';
import styles from './SliderButton.module.scss';

interface SliderButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

const { sliderButton, sliderButton__wrapper } = styles;

export const SliderButton: React.FC<SliderButtonProps> = React.memo(
  ({ direction, onClick }) => {
    return (
      <button
        className={sliderButton}
        onClick={onClick}
        aria-label={`${direction} slide`}
      >
        <div
          className={sliderButton__wrapper}
          style={direction === 'left' ? { transform: 'rotate(-180deg)' } : {}}
        >
          <img src="/icons/icon-arrow.svg" alt={`${direction} arrow`} />
        </div>
      </button>
    );
  },
);

SliderButton.displayName = 'SliderButton';
