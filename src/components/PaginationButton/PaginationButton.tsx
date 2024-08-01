import styles from './PaginationButton.module.scss';
import { useSearchParamValue } from '../../hooks/useSearchParamValue';
const { button, button__iconBlock, button__icon } = styles;

type Props = {
  direction: 'left' | 'right';
  disabled: boolean;
};

// TODO разобраться в useEffects тут и в paginationPageButton

// TODO add some styles for disabled buttons

export const PaginationButton = ({ direction, disabled }: Props) => {
  const [currentPage, setCurrentPage] = useSearchParamValue<number>('page', 1);

  const handleButtonClick = () => {
    if (direction === 'left') {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(currentPage + 1);
    }
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
