import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../features/pagination/paginationSlice.ts';

import styles from './PaginationPageButton.module.scss';
import { RootState } from '../../store.ts';
import { useEffect } from 'react';

const { button, button__numberBlock, button__isActive } = styles;

type Props = {
  pageNumber: number;
};

export const PaginationPageButton = ({ pageNumber }: Props) => {
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state: RootState) => state.pagination);

  // #region searchParams
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = searchParams.get('page');
    if (page && Number(page) !== currentPage) {
      dispatch(setCurrentPage(Number(page)));
    }
  }, [searchParams, currentPage, dispatch]);

  const isActivePage = pageNumber === currentPage;

  // #endregion

  const handleButtonClick = (page: number) => {
    dispatch(setCurrentPage(page));

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', `${page}`);

    setSearchParams(newSearchParams);
  };

  return (
    <button
      className={`${button} ${isActivePage ? button__isActive : ''}`}
      onClick={() => handleButtonClick(pageNumber)}
    >
      <div className={button__numberBlock}>{pageNumber}</div>
    </button>
  );
};
