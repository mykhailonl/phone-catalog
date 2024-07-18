export type DropDownSortOptions =
  | 'Newest'
  | 'Oldest'
  | 'Cheapest'
  | 'Expensive';

export interface DropDownSort {
  name: 'Sort by';
  urlSearchName: 'sortBy';
  values: DropDownSortOptions[];
}
