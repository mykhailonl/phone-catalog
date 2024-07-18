import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  setCurrentItem,
  setTargetImg,
} from '../../features/currentItem/currentItemSlice';

import { PageNotFound } from '../PageNotFound';

import { Category } from '../../types/CategoryTypes';
import { Item } from '../../types/Item';

import { fetchProducts } from '../../utils/fetchProducts';

import styles from './ItemCard.module.scss';
const {
  card,
  card__content,
  card__title,
  card__imgBlock,
  card__img,
  card__previews,
  card__sliderBlock,
  card__sliderBlockIsActive,
  card__sliderImg,
} = styles;

type Params = {
  category: Category;
  itemPage: string;
};

// TODO breadcrumbs
// TODO navigate back link

export const ItemCard = () => {
  const { category, itemPage } = useParams<Params>();

  const dispatch = useDispatch();
  const { currentItem, targetImgIndex } = useSelector(
    (state: RootState) => state.currentItem,
  );

  if (!category || !itemPage) {
    return <PageNotFound />;
  }

  useEffect(() => {
    const productsUrl = `/api/${category}.json`;

    fetchProducts(productsUrl).then((items: Item[]) => {
      const item = items.find((item) => item.id === itemPage);

      if (item) {
        dispatch(setCurrentItem(item));
      } else {
        return <PageNotFound />;
      }
    });
  }, [category, itemPage]);

  if (currentItem === null) {
    return null;
  }

  // #region handlers
  const handlePreviewClick = (index: number) => {
    dispatch(setTargetImg(index));
  };

  // #endregion

  return (
    <div className={card}>
      <div className={card__content}>
        <h2 className={card__title}>{currentItem.name}</h2>

        <div className={card__imgBlock}>
          <img
            src={`/${currentItem.images[targetImgIndex]}`}
            alt={`${currentItem.name} photo`}
            className={card__img}
          />
        </div>

        {/* TODO change approach to this section (display, width etc) */}
        <div className={card__previews}>
          {currentItem.images.map((photo, index) => (
            <div
              className={`
                ${card__sliderBlock} 
                ${index === targetImgIndex ? card__sliderBlockIsActive : ''}`}
              key={index}
              onClick={() => handlePreviewClick(index)}
            >
              <img
                src={`/${photo}`}
                alt={`${currentItem.name} photo preview`}
                className={card__sliderImg}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
