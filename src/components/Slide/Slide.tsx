import { Link } from 'react-router-dom';
import { Slide as SlideType } from '../../types/Slide';

export const Slide = ({ image, link }: SlideType) => {
  return (
    <Link to={link} className="flex h-full items-center justify-center">
      <img
        src={image}
        alt="slide image"
        className="m-0 h-full w-full object-center"
      />
    </Link>
  );
};
