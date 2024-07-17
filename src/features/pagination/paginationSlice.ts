import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DropDownSortOptions } from '../../types/DropDownSortOptions';
import { ItemsPerPageOptions } from '../../types/DropDownItemsPerPage';

interface paginationState {
  currentPage: number;
  itemsOnThePage: ItemsPerPageOptions;
  sortBy: DropDownSortOptions;
  activeDropdown: 'sortBy' | 'itemsOnPage' | null;
}

const initialState: paginationState = {
  currentPage: 1,
  itemsOnThePage: 32,
  sortBy: 'Newest',
  activeDropdown: null,
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    nextPage: (state) => {
      state.currentPage += 1;
    },
    prevPage: (state) => {
      state.currentPage -= 1;
    },
    setItemsOnThePage: (state, action: PayloadAction<ItemsPerPageOptions>) => {
      state.itemsOnThePage = action.payload;
    },
    setSortBy: (state, action: PayloadAction<DropDownSortOptions>) => {
      state.sortBy = action.payload;
    },
    setActiveDropdown: (
      state,
      action: PayloadAction<'sortBy' | 'itemsOnPage' | null>,
    ) => {
      state.activeDropdown = action.payload;
    },
  },
});

export default paginationSlice.reducer;

export const {
  setCurrentPage,
  nextPage,
  prevPage,
  setItemsOnThePage,
  setSortBy,
  setActiveDropdown,
} = paginationSlice.actions;
