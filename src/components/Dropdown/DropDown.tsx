import { memo, useCallback, useEffect, useMemo, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setActiveDropdown } from '../../features/pagination/paginationSlice';
import { ParamValue } from '../../hooks/useSearchParamValue';

import { DropDownItemsPerPage } from '../../types/DropDownItemsPerPage';
import { DropDownSort } from '../../types/DropDownSortOptions';

import styles from './DropDown.module.scss';
const {
  dropdown,
  dropdown__sort,
  dropdown__description,
  dropdown__list,
  dropdown__options,
  dropdown__optionsOpen,
  dropdown__optionsClosed,
  dropdown__option,
  dropdown__activeOption,
  dropdown__arrowBlock,
  dropdown__arrow,
  dropdown__arrowIsOpen,
} = styles;

type Props = {
  dropdownConfig: DropDownSort | DropDownItemsPerPage;
  value: ParamValue;
  onChange: (newValue: ParamValue) => void;
};

export const DropDown = memo(
  ({ dropdownConfig, value: currentValue, onChange }: Props) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    const { name, urlSearchName, values } = dropdownConfig;

    const { activeDropdown } = useAppSelector((state) => state.pagination);

    const handleDropDownClick = useCallback(() => {
      dispatch(
        setActiveDropdown(
          activeDropdown === urlSearchName ? null : urlSearchName,
        ),
      );
    }, [dispatch, activeDropdown, urlSearchName]);

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

    const options = useMemo(
      () =>
        values.map((value) => (
          <div
            key={value}
            className={`${dropdown__option} ${
              value === value && dropdown__activeOption
            }`}
            onClick={() => {
              onChange(value);
              dispatch(setActiveDropdown(null));
            }}
          >
            {value}
          </div>
        )),
      [values, onChange],
    );

    return (
      <div
        ref={dropdownRef}
        className={`${dropdown} ${dropdownConfig.urlSearchName === 'sort' ? dropdown__sort : ''}`}
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
  },
);

DropDown.displayName = 'DropDown';
