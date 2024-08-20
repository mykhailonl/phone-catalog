import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchProducts } from '../../utils/fetchProducts';

import { PageNotFound } from '../../pages/PageNotFound';
import { ColorSelector } from '../ColorSelector';
import { CapacitySelector } from '../CapacitySelector';
import { ProductActions } from '../ProductActions';
import { ProductPrice } from '../ProductPrice';
import { Specification } from '../Specification';
import { ProductAbout } from '../ProductAbout';
import { ProductSpecs } from '../ProductSpecs';
import { BreadCrumbs } from '../BreadCrumbs';
import { BackButton } from '../BackButton/BackButton';
import { ProductSlider } from '../ProductSlider';

import { Product } from '../../types/Product';
import { Category } from '../../types/CategoryTypes';
import { Item } from '../../types/Item';

import styles from './ItemCard.module.scss';
import { useQuery } from '@tanstack/react-query';
import { Loader } from '../Loader';
const {
  card,
  card__content,
  card__top,
  card__title,
  card__imgBlock,
  card__img,
  card__previews,
  card__sliderBlock,
  card__sliderBlockIsActive,
  card__sliderImg,
  card__controls,
  card__actions,
  card__price,
  card__specs,
} = styles;

type Params = {
  category: Category;
  itemPage: string;
};

export const ItemCard = () => {
  const { category, itemPage } = useParams<Params>();
  const [targetImgIndex, setTargetImgIndex] = useState(0);

  const {
    data: item,
    isLoading: isItemLoading,
    error: itemError,
  } = useQuery<Item, Error>({
    queryKey: ['item', category, itemPage],
    queryFn: async () => {
      const productsUrl = `/api/${category}.json`;
      const items: Item[] = await fetchProducts(productsUrl);
      const item = items.find((item) => item.id === itemPage);

      // TODO
      if (!item) throw new Error('Item not found');

      return item;
    },
    refetchOnMount: 'always',
  });

  const {
    data: product,
    isLoading: isProductLoading,
    error: productError,
  } = useQuery<Product, Error>({
    queryKey: ['product', itemPage],
    queryFn: async () => {
      const products: Product[] = await fetchProducts(`/api/products.json`);
      const product = products.find((prod) => prod.itemId === itemPage);
      if (!product) throw new Error('Product not found');
      return product;
    },
    refetchOnMount: 'always',
  });

  const isLoading = isItemLoading || isProductLoading;
  const error = itemError || productError;

  if (isLoading) return <Loader />;

  // TODO
  if (error) return <p>{`Error: ${error.message}`}</p>;

  if (!category || !itemPage || !item || !product) return <PageNotFound />;

  const handlePreviewClick = (index: number) => {
    setTargetImgIndex(index);
  };

  return (
    <div className={card}>
      <div className={card__content}>
        <div className={card__top}>
          <BreadCrumbs item={item} />

          <BackButton />

          <h2 className={card__title}>{item.name}</h2>

          <div className={card__imgBlock}>
            <img
              src={`/${item.images[targetImgIndex]}`}
              alt={`${item.name} photo`}
              className={card__img}
            />
          </div>

          <div className={card__previews}>
            {item.images.map((photo, index) => (
              <div
                className={`
                ${card__sliderBlock} 
                ${index === targetImgIndex && card__sliderBlockIsActive}`}
                key={index}
                onClick={() => handlePreviewClick(index)}
              >
                <img
                  src={`/${photo}`}
                  alt={`${item.name} photo preview`}
                  className={card__sliderImg}
                />
              </div>
            ))}
          </div>

          <div className={card__controls}>
            <ColorSelector item={item} colors={item.colorsAvailable} />

            <CapacitySelector
              item={item}
              capacityOptions={item.capacityAvailable}
            />

            <div className={card__actions}>
              {/* TODO what to do with a discount? */}
              <div className={card__price}>
                <ProductPrice
                  fullPrice={item.priceRegular}
                  discountedPrice={item.priceDiscount}
                  context="page"
                />
              </div>

              <ProductActions product={product} />
            </div>

            <div className={card__specs}>
              <Specification
                label="Screen"
                value={item.screen}
                context="page"
              />

              <Specification
                label="Resolution"
                value={item.resolution}
                context="page"
              />

              <Specification
                label="Processor"
                value={item.processor}
                context="page"
              />

              <Specification label="RAM" value={item.ram} context="page" />
            </div>
          </div>
        </div>

        <ProductAbout description={item.description} />

        <ProductSpecs product={item} />

        <ProductSlider
          title="You may also like"
          apiUrl="/api/products.json"
          discount={true}
          newOnly={false}
        />
      </div>
    </div>
  );
};
