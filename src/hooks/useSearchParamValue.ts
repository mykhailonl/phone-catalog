import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  DropDownSortOptions,
  SORT_OPTIONS,
} from '../types/DropDownSortOptions';
import {
  ITEMS_PER_PAGE_OPTIONS,
  ItemsPerPageOptions,
} from '../types/DropDownItemsPerPage';

// Names of URL parameters we're working with
type ParamName = 'sort' | 'perPage' | 'page';

// Possible types for our parameter values
type ParamValue = number | ItemsPerPageOptions | DropDownSortOptions;

// Check if a value is valid for a given parameter
const isValidParamValue = (param: ParamName, value: string): boolean => {
  switch (param) {
    case 'sort':
      return SORT_OPTIONS.includes(value as DropDownSortOptions);
    case 'perPage':
      return ITEMS_PER_PAGE_OPTIONS.includes(
        value === 'All' ? value : (Number(value) as ItemsPerPageOptions),
      );
    case 'page':
      return !isNaN(+value) && Number.isInteger(+value) && +value > 0;
    default:
      return false;
  }
};

/**
 * A hook to easily work with URL parameters.
 *
 * @param paramName - Which URL parameter to use
 * @param defaultValue - What to use if the parameter isn't in the URL
 * @returns Current value and a function to update it
 */
export const useSearchParamValue = (
  paramName: ParamName,
  defaultValue: ParamValue,
): [ParamValue, (newValue: ParamValue) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();

  const paramValue = searchParams.get(paramName);

  // Figure out the current value
  const value: ParamValue = useMemo(() => {
    if (paramValue !== null && isValidParamValue(paramName, paramValue)) {
      if (paramName === 'page' || paramName === 'perPage') {
        return (
          paramValue === 'All' ? paramValue : Number(paramValue)
        ) as ParamValue;
      }
      return paramValue as ParamValue;
    }
    return defaultValue;
  }, [paramName, paramValue, defaultValue]);

  // Function to update the value
  const setValue = useCallback(
    (newValue: ParamValue) => {
      const stringValue = String(newValue);

      if (isValidParamValue(paramName, stringValue)) {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set(paramName, stringValue);
        setSearchParams(newSearchParams);
      } else {
        console.error(`Oops! Invalid value for ${paramName}: ${newValue}`);
      }
    },
    [paramName, searchParams, setSearchParams],
  );

  return [value, setValue];
};
