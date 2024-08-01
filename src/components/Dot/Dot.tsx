import { setCurrentIndex } from '../../features/slider/sliderSlice';

import styles from './Dot.module.scss';
import { useAppDispatch } from '../../hooks';

type Props = {
  isActive: boolean;
  id: number;
};

export const Dot = ({ isActive, id }: Props) => {
  const dispatch = useAppDispatch();

  const handleDotClick = () => {
    dispatch(setCurrentIndex(id));
  };

  const { dot, dot__content, dot__isActive } = styles;

  return (
    <button className={dot} onClick={handleDotClick}>
      <div
        className={`${dot__content} ${isActive ? dot__isActive : 'bg-elements'}`}
      />
    </button>
  );
};
