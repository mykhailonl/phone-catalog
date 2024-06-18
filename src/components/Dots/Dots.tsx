import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Dot } from '../Dot';

export const Dots = () => {
  const { currentIndex, slides } = useSelector(
    (state: RootState) => state.slider,
  );

  return (
    <div className="flex h-6 w-20 gap-1">
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
