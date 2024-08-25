export enum DropDownSortOptions {
  age = 'Newest',
  title = 'Alphabetically',
  price = 'Cheapest',
}

export const SORT_OPTIONS = Object.values(DropDownSortOptions);

export interface DropDownSort {
  name: 'Sort by';
  urlSearchName: 'sort';
  values: DropDownSortOptions[];
}
