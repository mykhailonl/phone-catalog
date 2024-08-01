import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface paginationState {
  activeDropdown: 'sort' | 'perPage' | null;
  // pageNumbers: number[] | null;
}

const initialState: paginationState = {
  activeDropdown: null,
  // pageNumbers: [],
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setActiveDropdown: (
      state,
      action: PayloadAction<'sort' | 'perPage' | null>,
    ) => {
      state.activeDropdown = action.payload;
    },
    // setPages: (state, action: PayloadAction<number[] | null>) => {
    //   state.pageNumbers = action.payload;
    // },
  },
});

export default paginationSlice.reducer;

export const {
  setActiveDropdown,
  // setPages,
} = paginationSlice.actions;
