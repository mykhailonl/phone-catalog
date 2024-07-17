import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  nextPage,
  prevPage,
} from '../../features/pagination/paginationSlice.ts';

import styles from './PaginationButton.module.scss';
import { RootState } from '../../store';
const { button, button__iconBlock, button__icon } = styles;

type Props = {
  direction: 'left' | 'right';
  disabled: boolean;
};

// TODO разобраться в useEffects тут и в paginationPageButton

// TODO add some styles for disabled buttons

export const PaginationButton = ({ direction, disabled }: Props) => {
  const dispatch = useDispatch();
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage,
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const handleButtonClick = () => {
    if (direction === 'left') {
      dispatch(prevPage());
    } else {
      dispatch(nextPage());
    }

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(
      'page',
      `${currentPage + (direction === 'left' ? -1 : 1)}`,
    );
    setSearchParams(newSearchParams);
  };

  return (
    <button className={button} disabled={disabled} onClick={handleButtonClick}>
      <div className={button__iconBlock}>
        <img
          src={`/public/icons/${direction}-arrow.svg`}
          alt="pagination button"
          className={button__icon}
        />
      </div>
    </button>
  );
};
