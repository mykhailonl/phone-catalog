import { useDispatch } from 'react-redux';
import { setCurrentIndex } from '../../features/slider/sliderSlice';

type Props = {
  isActive: boolean;
  id: number;
};

export const Dot = ({ isActive, id }: Props) => {
  const dispatch = useDispatch();

  const handleDotClick = () => {
    dispatch(setCurrentIndex(id));
  };

  return (
    <button
      className="flex h-full w-6 items-center justify-center"
      onClick={handleDotClick}
    >
      <div
        className={`h-1 w-[14px] ${isActive ? 'bg-gray-primary' : 'bg-elements'}`}
      />
    </button>
  );
};
