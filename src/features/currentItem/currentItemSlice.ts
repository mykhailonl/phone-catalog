import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Item } from '../../types/Item';

export type currentItemState = {
  currentItem: Item | null;
  targetImgIndex: number;
};

const initialState: currentItemState = {
  currentItem: null,
  targetImgIndex: 0,
};

export const currentItemSlice = createSlice({
  name: 'currentItem',
  initialState,
  reducers: {
    setCurrentItem: (state, action: PayloadAction<Item | null>) => {
      state.currentItem = action.payload;

      if (action.payload === null) {
        state.targetImgIndex = 0;
      }
    },
    setTargetImg: (state, action: PayloadAction<number>) => {
      state.targetImgIndex = action.payload;
    },
  },
});

export default currentItemSlice.reducer;
export const { setCurrentItem, setTargetImg } = currentItemSlice.actions;
