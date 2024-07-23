import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import styles from './BreadCrumbs.module.scss';
const {
  breadcrumbs,
  breadcrumbs__link,
  breadcrumbs__icon,
  breadcrumbs__text,
  breadcrumbs__textGray,
} = styles;

// FIXME better solution to center link text?

export const BreadCrumbs = () => {
  const { category, itemPage } = useParams();
  const normalizedCategory =
    category && category[0].toUpperCase() + category.slice(1);
  const productName = useSelector(
    (state: RootState) => state.currentItem.currentItem?.name,
  );

  return (
    <div className={breadcrumbs}>
      <Link to="/" className={breadcrumbs__link}>
        <img
          src="/icons/icon-home.svg"
          alt="home link"
          className={breadcrumbs__icon}
        />
      </Link>

      {category && (
        <>
          <img
            src="/icons/breadcrumb-arrow.svg"
            alt="right arrow"
            className={breadcrumbs__icon}
          />
          <Link to={`/${category}`} className={styles.breadcrumbs__link}>
            <span
              className={`${breadcrumbs__text} ${itemPage ? breadcrumbs__textGray : ''}`}
            >
              {normalizedCategory}
            </span>
          </Link>
        </>
      )}

      {itemPage && (
        <>
          <img
            src="/icons/breadcrumb-arrow.svg"
            alt="right arrow"
            className={breadcrumbs__icon}
          />
          <span className={breadcrumbs__text}>{productName}</span>
        </>
      )}
    </div>
  );
};
