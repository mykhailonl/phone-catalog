import { useNavigate, useParams } from 'react-router-dom';

import styles from './BackButton.module.scss';
const { button, button__icon, button__label } = styles;

// FIXME maybe rework routes and make navigate '..' simplier?

export const BackButton = () => {
  const navigate = useNavigate();
  const { category } = useParams();

  const handleBack = () => {
    navigate(`/${category}`);
  };

  return (
    <div onClick={handleBack} className={button}>
      <img
        src="/public/icons/breadcrumbs-back.svg"
        alt="back button"
        className={button__icon}
      />

      <span className={button__label}>Back</span>
    </div>
  );
};
