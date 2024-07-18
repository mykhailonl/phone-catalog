export type ItemsPerPageOptions = 8 | 16 | 24 | 32;

export interface DropDownItemsPerPage {
  name: 'Items on page';
  urlSearchName: 'itemsOnPage';
  values: ItemsPerPageOptions[];
}
