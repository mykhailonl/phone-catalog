import { memo, useCallback, useEffect, useMemo, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setActiveDropdown } from '../../features/pagination/paginationSlice';
import { useSearchParamValue } from '../../hooks/useSearchParamValue';

import {
  DropDownItemsPerPage,
  ItemsPerPageOptions,
} from '../../types/DropDownItemsPerPage';
import {
  DropDownSort,
  DropDownSortOptions,
} from '../../types/DropDownSortOptions';

import styles from './DropDown.module.scss';

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

type Props = {
  dropdownConfig: DropDownSort | DropDownItemsPerPage;
};

export const DropDown = memo(({ dropdownConfig }: Props) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { name, urlSearchName, values } = dropdownConfig;

  const [sortBy, setSortBy] = useSearchParamValue(
    'sort',
    DropDownSortOptions.age,
  );
  const [itemsOnPage, setItemsOnPage] = useSearchParamValue('perPage', 'All');

  const dispatch = useAppDispatch();
  const { activeDropdown } = useAppSelector((state) => state.pagination);

  const handleDropDownClick = useCallback(() => {
    dispatch(
      setActiveDropdown(
        activeDropdown === urlSearchName ? null : urlSearchName,
      ),
    );
  }, [dispatch, activeDropdown, urlSearchName]);

  const handleOptionClick = useCallback(
    (newValue: ItemsPerPageOptions | DropDownSortOptions) => {
      if (dropdownConfig.name === 'Sort by') {
        setSortBy(newValue as DropDownSortOptions);
      } else {
        setItemsOnPage(newValue as ItemsPerPageOptions);
      }
      dispatch(setActiveDropdown(null));
    },
    [dropdownConfig.name, setSortBy, setItemsOnPage, dispatch],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        activeDropdown === urlSearchName
      ) {
        dispatch(setActiveDropdown(null));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch, activeDropdown, urlSearchName]);

  const isOpen = useMemo(
    () => activeDropdown === urlSearchName,
    [activeDropdown, urlSearchName],
  );
  const currentValue = useMemo(
    () => (dropdownConfig.name === 'Sort by' ? sortBy : itemsOnPage),
    [dropdownConfig.name, sortBy, itemsOnPage],
  );

  const options = useMemo(
    () =>
      values.map((value) => (
        <div
          key={value}
          className={dropdown__option}
          onClick={() => handleOptionClick(value)}
        >
          {value}
        </div>
      )),
    [values, handleOptionClick],
  );

  return (
    <div
      ref={dropdownRef}
      className={dropdown}
      style={
        dropdownConfig.name === 'Sort by'
          ? { width: '176px' }
          : { width: '128px' }
      }
    >
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
        {options}
      </div>
    </div>
  );
});

DropDown.displayName = 'DropDown';
