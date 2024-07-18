import { useSelector } from 'react-redux';
import { PaginationButton } from '../PaginationButton';
import { PaginationPageButton } from '../PaginationPageButton';

import styles from './Pagination.module.scss';
import { RootState } from '../../store';

const { pagination, pagination__pages } = styles;

type Props = {
  pages: number;
};

// TODO убрать ошибку с возможностью использования невалидной страницы page= в url

export const Pagination = ({ pages }: Props) => {
  const { currentPage } = useSelector((state: RootState) => state.pagination);
  const pageNumbers = [];

  for (let i = 0; i < pages; i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <div className={pagination}>
      <PaginationButton direction="left" disabled={currentPage === 1} />

      <div className={pagination__pages}>
        {pageNumbers.map((page, index) => (
          <PaginationPageButton pageNumber={page} key={index} />
        ))}
      </div>

      <PaginationButton direction="right" disabled={currentPage === pages} />
    </div>
  );
};
