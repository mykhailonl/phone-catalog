import { setScrollToTop } from '../../features/scroll/scrollSlice';

import { useSearchParamValue } from '../../hooks/useSearchParamValue.ts';

import { Button } from '../Button';
import { PaginationPageButton } from '../PaginationPageButton/PaginationPageButton.tsx';

import styles from './Pagination.module.scss';
import { useAppDispatch } from '../../hooks.ts';
const { pagination, pagination__pages } = styles;

type Props = {
  pages: number;
};

// TODO убрать ошибку с возможностью использования невалидной страницы page= в url
// TODO проблема возникает, когда в url есть параметр страницы

export const Pagination = ({ pages }: Props) => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useSearchParamValue('page', 1);

  const pageNumbers: number[] = [];

  for (let i = 0; i < pages; i++) {
    pageNumbers.push(i + 1);
  }

  // ! check if i need that
  // dispatch(setPages(pageNumbers));

  const handlePageChange = (direction: 'left' | 'right') => {
    const newCurrentPage =
      direction === 'left' ? +currentPage - 1 : +currentPage + 1;
    setCurrentPage(newCurrentPage);

    dispatch(setScrollToTop());
  };

  return (
    <div className={pagination}>
      <Button
        bgImg="/icons/icon-arrow.svg"
        action={() => handlePageChange('left')}
        disabled={currentPage === 1}
        additionalStyles={{ transform: 'rotate(-180deg)' }}
      />

      <div className={pagination__pages}>
        {pageNumbers.map((page, index) => (
          <PaginationPageButton key={index} pageNumber={page} />
        ))}
      </div>

      <Button
        bgImg="/icons/icon-arrow.svg"
        action={() => handlePageChange('right')}
        disabled={currentPage === pageNumbers.length}
        additionalStyles={{}}
      />
    </div>
  );
};
