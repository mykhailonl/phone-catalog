import { useLocation, useNavigate, useParams } from 'react-router-dom';

import styles from './BackButton.module.scss';
const { button, button__icon, button__label } = styles;

export const BackButton = () => {
  const navigate = useNavigate();
  const { category, itemPage } = useParams();
  const location = useLocation();

  const handleBack = () => {
    if (location.state?.from === 'user' && location.state.previousPath) {
      // * if we get there from cart or fav - get back there
      navigate(location.state.previousPath);
    } else if (location.key === 'default') {
      // * if we get there from the shared link as a new tab -
      // * get back to the category page
      navigate(`/catalog/${category}`);
    } else if (itemPage) {
      // * if we get there from category - get back to it
      navigate(`/catalog/${category}`);
    } else if (category) {
      // * if on the category page - get to home page
      navigate('/');
    } else {
      // * any other cases - just a step back
      navigate('..');
    }
  };

  return (
    <div onClick={handleBack} className={button}>
      <div className={button__icon} />

      <span className={button__label}>Back</span>
    </div>
  );
};
