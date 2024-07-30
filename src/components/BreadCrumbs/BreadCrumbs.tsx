import { ReactNode, memo, useCallback, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import styles from './BreadCrumbs.module.scss';
const {
  breadcrumbs,
  breadcrumbs__link,
  breadcrumbs__icon,
  breadcrumbs__arrow,
  breadcrumbs__text,
  breadcrumbs__textGray,
} = styles;

export const BreadCrumbs = memo(() => {
  const { category, itemPage } = useParams();
  const normalizedCategory = useMemo(
    () => category && category[0].toUpperCase() + category.slice(1),
    [category],
  );
  const productName = useSelector(
    (state: RootState) => state.currentItem.currentItem?.name,
  );

  const renderLink = useCallback(
    (to: string, className: string, content: ReactNode) => (
      <Link to={to} className={className}>
        {content}
      </Link>
    ),
    [],
  );

  return (
    <div className={breadcrumbs}>
      {renderLink(
        '/',
        breadcrumbs__link,
        <img
          src="/icons/icon-home.svg"
          alt="home link"
          className={breadcrumbs__icon}
        />,
      )}

      {category && (
        <>
          <div className={`${breadcrumbs__icon} ${breadcrumbs__arrow} `} />
          {renderLink(
            `/${category}`,
            breadcrumbs__link,
            <span
              className={`${breadcrumbs__text} ${itemPage ? breadcrumbs__textGray : ''}`}
            >
              {normalizedCategory}
            </span>,
          )}
        </>
      )}

      {itemPage && (
        <>
          <div className={`${breadcrumbs__icon} ${breadcrumbs__arrow} `} />
          <span className={breadcrumbs__text}>{productName}</span>
        </>
      )}
    </div>
  );
});

BreadCrumbs.displayName = 'BreadCrumbs';
