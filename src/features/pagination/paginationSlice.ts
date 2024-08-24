import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface paginationState {
  activeDropdown: 'sort' | 'perPage' | null;
}

const initialState: paginationState = {
  activeDropdown: null,
};

// TODO rename to dropdown or smth?
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
  },
});

export default paginationSlice.reducer;

export const { setActiveDropdown } = paginationSlice.actions;
