import { useSearchParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  setActiveDropdown,
  setSortBy,
  setItemsOnThePage,
} from '../../features/pagination/paginationSlice';

import {
  DropDownItemsPerPage,
  ItemsPerPageOptions,
} from '../../types/DropDownItemsPerPage';
import {
  DropDownSort,
  DropDownSortOptions,
} from '../../types/DropDownSortOptions';

import styles from './DropDown.module.scss';

type Props = {
  dropdownConfig: DropDownSort | DropDownItemsPerPage;
  currentValue: DropDownSortOptions | ItemsPerPageOptions;
};

const {
  dropdown,
  dropdown__description,
  dropdown__list,
  dropdown__options,
  dropdown__optionsOpen,
  dropdown__optionsClosed,
  dropdown__option,
  dropdown__arrowBlock,
  dropdown__arrow,
  dropdown__arrowIsOpen,
} = styles;

// TODO реагировать на клики вне опций и тд

export const DropDown = ({ dropdownConfig, currentValue }: Props) => {
  const { name, urlSearchName, values } = dropdownConfig;

  const dispatch = useDispatch();
  const { activeDropdown } = useSelector(
    (state: RootState) => state.pagination,
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const handleDropDownClick = () => {
    dispatch(
      setActiveDropdown(
        activeDropdown === urlSearchName ? null : urlSearchName,
      ),
    );
  };

  const handleOptionClick = (value: string | number) => {
    dispatch(setActiveDropdown(null));

    const newParams = new URLSearchParams(searchParams);
    newParams.set(urlSearchName, `${value}`);
    setSearchParams(newParams);

    if (urlSearchName === 'sortBy') {
      dispatch(setSortBy(value as DropDownSortOptions));
    } else if (urlSearchName === 'itemsOnPage') {
      dispatch(setItemsOnThePage(+value as ItemsPerPageOptions));
    }
  };

  const isOpen = activeDropdown === urlSearchName;

  return (
    <div className={dropdown}>
      <label className={dropdown__description}>{name}</label>

      <div className={dropdown__list} onClick={handleDropDownClick}>
        {currentValue}

        <div className={dropdown__arrowBlock}>
          <div
            className={`${dropdown__arrow} ${isOpen && dropdown__arrowIsOpen}`}
          />
        </div>
      </div>

      <div
        className={`${dropdown__options} ${isOpen ? dropdown__optionsOpen : dropdown__optionsClosed}`}
      >
        {values.map((value) => (
          <div
            key={value}
            className={dropdown__option}
            onClick={() => handleOptionClick(value)}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};
