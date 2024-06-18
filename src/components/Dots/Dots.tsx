import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type Props = {
  isActive: boolean;
};

const Dot = ({ isActive }: Props) => {
  return (
    <button className="flex h-full w-6 items-center justify-center">
      <div
        className={`h-1 w-[14px] ${isActive ? 'bg-gray-primary' : 'bg-elements'}`}
      />
    </button>
  );
};

export const Dots = () => {
  const { currentIndex, slides } = useSelector(
    (state: RootState) => state.slider,
  );

  return (
    <div className="flex h-6 w-20 gap-1">
      {slides.slice(1, -1).map((slide) => (
        <Dot key={slide.id} isActive={slide.id === currentIndex} />
      ))}
    </div>
  );
};
