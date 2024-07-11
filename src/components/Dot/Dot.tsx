import { useDispatch } from 'react-redux';
import { setCurrentIndex } from '../../features/slider/sliderSlice';

import styles from './Dot.module.scss';

type Props = {
  isActive: boolean;
  id: number;
};

export const Dot = ({ isActive, id }: Props) => {
  const dispatch = useDispatch();

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
