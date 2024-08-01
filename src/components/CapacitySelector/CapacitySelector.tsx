import { useNavigate, useParams } from 'react-router-dom';

import { setCurrentItem } from '../../features/currentItem/currentItemSlice';

import styles from './CapacitySelector.module.scss';
import { fetchProducts } from '../../utils/fetchProducts';
import { Item } from '../../types/Item';
import { useAppDispatch, useAppSelector } from '../../hooks';

const {
  capacity__selector,
  capacity__content,
  capacity__title,
  capacity__options,
  capacity__option,
  capacity__line,
  isActive,
} = styles;

type Props = {
  capacityOptions: string[];
};

export const CapacitySelector = ({ capacityOptions }: Props) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentItem = useAppSelector((state) => state.currentItem.currentItem);

  const handleCapacityChange = async (newCapacity: string) => {
    if (!currentItem) return;

    const productsUrl = `/api/${category}.json`;
    const items: Item[] = await fetchProducts(productsUrl);

    const newItem = items.find(
      (item) =>
        item.namespaceId === currentItem.namespaceId &&
        item.capacity === newCapacity &&
        item.color === currentItem.color,
    );

    if (newItem) {
      dispatch(setCurrentItem(newItem));
      navigate(
        `/catalog/${newItem.category}/${newItem.namespaceId}-${newItem.capacity}-${newItem.color}`,
      );
    }
  };

  return (
    <div className={capacity__selector}>
      <div className={capacity__content}>
        <h3 className={capacity__title}>Select capacity</h3>

        <div className={capacity__options}>
          {capacityOptions.map((capacity, index) => {
            return (
              <div
                key={index}
                className={`${capacity__option} ${currentItem?.capacity === capacity ? isActive : ''}`}
                onClick={() => handleCapacityChange(capacity)}
              >
                {capacity}
              </div>
            );
          })}
        </div>
      </div>

      <div className={capacity__line}></div>
    </div>
  );
};
