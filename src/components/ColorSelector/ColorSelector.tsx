import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setCurrentItem } from '../../features/currentItem/currentItemSlice';

import styles from './ColorSelector.module.scss';
import { fetchProducts } from '../../utils/fetchProducts';
import { Item } from '../../types/Item';

const {
  colorSelector,
  title,
  colorOptions,
  colorCircle,
  innerCircle,
  isActive,
  line,
} = styles;

type Props = {
  colors: string[];
};

const colorPalette: { [key: string]: string } = {
  midnight: '#1B222B',
  yellow: '#F9E470',
  purple: '#E6DFED',
  spacegray: '#828589',
  'space gray': '#828589',
  silver: '#E3E3E5',
  gold: '#F8DAD0',
  'rose gold': '#ECC4BC',
  blue: '#33384F',
  'sky blue': '#C1D1DE',
  red: '#F44C54',
  green: '#C5D5C0',
  starlight: '##F3EDE8',
  pink: '#F9E5E4',
};

export const ColorSelector = ({ colors }: Props) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentItem = useSelector(
    (state: RootState) => state.currentItem.currentItem,
  );

  const handleColorChange = async (newColor: string) => {
    if (!currentItem) return;

    const productsUrl = `/api/${category}.json`;
    const items: Item[] = await fetchProducts(productsUrl);

    const newItem = items.find(
      (item) =>
        item.namespaceId === currentItem.namespaceId &&
        item.capacity === currentItem.capacity &&
        item.color === newColor,
    );

    if (newItem) {
      dispatch(setCurrentItem(newItem));
      navigate(
        `/${newItem.category}/${newItem.namespaceId}-${newItem.capacity}-${newItem.color}`,
      );
    }
  };

  return (
    <div className={colorSelector}>
      <h3 className={title}>Available colors</h3>

      <div className={colorOptions}>
        {colors.map((color, index) => {
          const colorValue = colorPalette[color];

          return (
            <div
              key={index}
              className={`${colorCircle} ${currentItem && currentItem.color === color ? isActive : ''}`}
              onClick={() => handleColorChange(color)}
            >
              <div
                className={innerCircle}
                style={{ backgroundColor: colorValue }}
              />
            </div>
          );
        })}
      </div>

      <div className={line}></div>
    </div>
  );
};
