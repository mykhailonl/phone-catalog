import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Dot } from '../Dot';

import styles from './Dots.module.scss';

export const Dots = () => {
  const { currentIndex, slides } = useSelector(
    (state: RootState) => state.slider,
  );

  return (
    <div className={styles.dots}>
      {slides.slice(1, -1).map((slide) => (
        <Dot
          key={slide.id}
          isActive={slide.id === currentIndex}
          id={slide.id}
        />
      ))}
    </div>
  );
};
