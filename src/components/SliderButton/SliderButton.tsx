import { useDispatch } from 'react-redux';
import { setNextSlide, setPrevSlide } from '../../features/slider/sliderSlice';

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

  return (
    <button
      className="hidden flex-col items-center justify-center md:flex border-[1px] border-icons w-8"
      onClick={() => {
        handleClick()
        console.log(direction)
      }}
    >
      <div className="flex h-4 w-4 items-center justify-center">
        <img
          src={`../src/img/icons/${direction}-arrow.svg`}
          alt={`${direction}-arrow`}
          className="items-center justify-center"
        />
      </div>
    </button>
  );
};
