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
    },
    setTargetImg: (state, action: PayloadAction<number>) => {
      state.targetImgIndex = action.payload;
    },
    updateItemProperty: (
      state,
      action: PayloadAction<{ property: string; value: string }>,
    ) => {
      if (!state.currentItem) return;

      const { property, value } = action.payload;

      if (property === 'color') {
        console.log('color change');

        const newColor = value;
        state.currentItem.color = newColor;

        // upd images
        state.currentItem.images = state.currentItem.images.map((img) =>
          img.replace(/\/([^\/]+)\/([^\/]+)$/, `/${newColor.toLowerCase()}/$2`),
        );

        // upd name
        const nameParts = state.currentItem.name.split(' ');
        nameParts[nameParts.length - 1] =
          newColor.charAt(0).toUpperCase() + newColor.slice(1);
        state.currentItem.name = nameParts.join(' ');

        // upd id
        state.currentItem.id = state.currentItem.id.replace(
          /-[^\/]+$/,
          `-${newColor}`,
        );
      } else if (property === 'capacity') {
        state.currentItem.capacity = value;

        // upd name for memory capacity
        const nameParts = state.currentItem.name.split(' ');
        nameParts[nameParts.length - 2] = value;
        state.currentItem.name = nameParts.join(' ');

        // upd id
        state.currentItem.id = state.currentItem.id.replace(
          /-[^\/]+$/,
          `-${value}`,
        );
      }
    },
  },
});

export default currentItemSlice.reducer;
export const {
  setCurrentItem,
  setTargetImg,
  updateItemProperty,
  setCurrentProduct,
} = currentItemSlice.actions;
