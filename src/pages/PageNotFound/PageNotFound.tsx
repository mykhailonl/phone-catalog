import { useEffect } from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';

import { BackButton } from '../../components/BackButton';

import styles from './PageNotFound.module.scss';
const { page, page__notFoundImg } = styles;

type PageNotFoundProps = {
  productNotFound?: boolean;
};

export const PageNotFound = ({ productNotFound }: PageNotFoundProps) => {
  const navigate = useNavigate();
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === 'idle') {
      const timer = setTimeout(() => {
        navigate('/');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [navigation]);

  return (
    <div className={page}>
      <BackButton notFoundPage />

      <img
        src={`${productNotFound ? '/img/product-not-found.jpg' : '/img/page-not-found.jpg'}`}
        alt="Page not found"
        className={page__notFoundImg}
        onClick={() => navigate('/')}
      />
    </div>
  );
};
