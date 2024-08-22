import styles from './PaginationButton.module.scss';
import { useSearchParamValue } from '../../hooks/useSearchParamValue';
const { button, button__iconBlock } = styles;

type Props = {
  direction: 'left' | 'right';
  disabled: boolean;
};

export const PaginationButton = ({ direction, disabled }: Props) => {
  const [currentPage, setCurrentPage] = useSearchParamValue('page', 1);

  const handleButtonClick = () => {
    if (direction === 'left') {
      setCurrentPage(+currentPage - 1);
    } else {
      setCurrentPage(+currentPage + 1);
    }
  };

  return (
    <button className={button} disabled={disabled} onClick={handleButtonClick}>
      <div className={button__iconBlock}>
        <img
          src={`/public/icons/${direction}-arrow.svg`}
          alt="pagination button"
        />
      </div>
    </button>
  );
};
