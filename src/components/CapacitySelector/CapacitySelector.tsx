import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { updateItemProperty } from '../../features/currentItem/currentItemSlice';

import styles from './CapacitySelector.module.scss';

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentItem = useSelector(
    (state: RootState) => state.currentItem.currentItem,
  );

  const handleCapacityChange = (capacity: string) => {
    if (!currentItem) return;

    dispatch(updateItemProperty({ property: 'capacity', value: capacity }));
    navigate(
      `/${currentItem.category}/${currentItem.namespaceId}-${capacity}-${currentItem.color}`,
    );
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
