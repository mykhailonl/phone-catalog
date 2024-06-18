import { Link } from 'react-router-dom';
import { Slide as SlideType } from '../../types/Slide';

export const Slide = ({ image, link }: SlideType) => {
  return (
    <Link to={link}>
      <img src={image} alt="slide image" className="h-full w-full" />
    </Link>
  );
};
