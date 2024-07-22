import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { updateItemProperty } from '../../features/currentItem/currentItemSlice';

import styles from './ColorSelector.module.scss';

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
};

export const ColorSelector = ({ colors }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentItem = useSelector(
    (state: RootState) => state.currentItem.currentItem,
  );

  const handleColorChange = (color: string) => {
    if (!currentItem) return;

    dispatch(updateItemProperty({ property: 'color', value: color }));
    navigate(
      `/${currentItem.category}/${currentItem.namespaceId}-${currentItem.capacity}-${currentItem.color}`,
    );
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
