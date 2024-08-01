import { setScrollToTop } from '../../features/scroll/scrollSlice';

import { Button } from '../Button/Button.tsx';
import { useSearchParamValue } from '../../hooks/useSearchParamValue.ts';
import { useAppDispatch } from '../../hooks.ts';

type Props = {
  pageNumber: number;
};

export const PaginationPageButton = ({ pageNumber }: Props) => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useSearchParamValue<number>('page', 1);

  const isActivePage = pageNumber === currentPage;

  const handleButtonClick = (page: number) => {
    dispatch(setScrollToTop());

    setCurrentPage(page);
  };

  const additionalStyles = {
    backgroundColor: '#313237',
    color: '#FFFFFF',
    borderColor: '#313237',
  };

  return (
    <Button
      pageNumber={pageNumber}
      disabled={false}
      action={() => handleButtonClick(pageNumber)}
      additionalStyles={isActivePage ? additionalStyles : {}}
    />
  );
};
