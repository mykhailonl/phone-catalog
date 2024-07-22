import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  setCurrentItem,
  setCurrentProduct,
  setTargetImg,
} from '../../features/currentItem/currentItemSlice';

import { PageNotFound } from '../PageNotFound';

import { Category } from '../../types/CategoryTypes';
import { Item } from '../../types/Item';

import { fetchProducts } from '../../utils/fetchProducts';

import { ColorSelector } from '../ColorSelector';
import { CapacitySelector } from '../CapacitySelector';
import { ProductActions } from '../ProductActions';

import styles from './ItemCard.module.scss';
import { ProductPrice } from '../ProductPrice';
import { Product } from '../../types/Product';
import { Specification } from '../Specification';
import { ProductAbout } from '../ProductAbout';
import { ProductSpecs } from '../ProductSpecs';

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
  card__controls,
  card__colors,
  card__capacity,
  card__actions,
  card__price,
  card__specs,
} = styles;

type Params = {
  category: Category;
  itemPage: string;
};

// TODO breadcrumbs
// TODO navigate back link

// TODO change Price on color/capacity change

export const ItemCard = () => {
  const { category, itemPage } = useParams<Params>();

  const dispatch = useDispatch();
  const { currentItem, currentProduct, targetImgIndex } = useSelector(
    (state: RootState) => state.currentItem,
  );

  if (!category || !itemPage) {
    return <PageNotFound />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsUrl = `/api/${category}.json`;
        const items: Item[] = await fetchProducts(productsUrl);

        const item = items.find((item) => item.id === itemPage);

        if (!item) {
          return <PageNotFound />;
        }

        dispatch(setCurrentItem(item));

        const products: Product[] = await fetchProducts(`/api/products.json`);
        const newProduct = products.find((prod) => prod.itemId === item.id);

        if (!newProduct) {
          return <PageNotFound />;
        }

        dispatch(setCurrentProduct(newProduct));
      } catch (error) {
        return <p>{`Error happened while fetching products: ${error}`}</p>;
      }
    };

    fetchData();
  }, [category, itemPage, dispatch]);

  if (!currentItem || !currentProduct) {
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

        <div className={card__controls}>
          <div className={card__colors}>
            <ColorSelector colors={currentItem.colorsAvailable} />
          </div>

          <div className={card__capacity}>
            <CapacitySelector capacityOptions={currentItem.capacityAvailable} />
          </div>

          <div className={card__actions}>
            {/* TODO what to do with a discount? */}
            <div className={card__price}>
              <ProductPrice
                fullPrice={currentItem.priceRegular}
                discountedPrice={currentItem.priceDiscount}
                context="page"
              />
            </div>

            <ProductActions product={currentProduct} />
          </div>

          <div className={card__specs}>
            <Specification
              label="Screen"
              value={currentItem.screen}
              context="page"
            />

            <Specification
              label="Resolution"
              value={currentItem.resolution}
              context="page"
            />

            <Specification
              label="Processor"
              value={currentItem.processor}
              context="page"
            />

            <Specification label="RAM" value={currentItem.ram} context="page" />
          </div>
        </div>

        <ProductAbout description={currentItem.description} />

        <ProductSpecs product={currentItem} />
      </div>
    </div>
  );
};
