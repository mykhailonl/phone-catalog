/* eslint-disable no-useless-escape */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Item } from '../../types/Item';
import { Product } from '../../types/Product';

export type currentItemState = {
  currentItem: Item | null;
  currentProduct: Product | null;
  targetImgIndex: number;
};

const initialState: currentItemState = {
  currentItem: null,
  currentProduct: null,
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
    setCurrentProduct: (state, action: PayloadAction<Product | null>) => {
      state.currentProduct = action.payload;
      state.targetImgIndex = 0;
    },
    setTargetImg: (state, action: PayloadAction<number>) => {
      state.targetImgIndex = action.payload;
    },
  },
});

export default currentItemSlice.reducer;
export const { setCurrentItem, setTargetImg, setCurrentProduct } =
  currentItemSlice.actions;
