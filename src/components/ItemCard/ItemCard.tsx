import { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

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
import { Loader } from '../Loader';

import { Product } from '../../types/Product';
import { Category } from '../../types/CategoryTypes';
import { Item } from '../../types/Item';

import styles from './ItemCard.module.scss';
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
  const navigate = useNavigate();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [targetImgIndex, setTargetImgIndex] = useState(0);

  // Fetch all item options for the current category
  const {
    data: itemOptions,
    isLoading: isItemOptionsLoading,
    error: itemOptionsError,
  } = useQuery<Item[], Error>({
    queryKey: ['models', category],
    queryFn: async () => {
      if (!category) return [];

      const response: Item[] = await fetchProducts(`/api/${category}.json`);

      return response;
    },
  });

  const productQueryKey = useMemo(() => ['product', itemPage], [itemPage]);

  // Fetch the current product with optimized caching
  const {
    data: currentProduct,
    isLoading: isProductLoading,
    error: productError,
  } = useQuery<Product, Error>({
    queryKey: productQueryKey,
    queryFn: async () => {
      const products: Product[] = await fetchProducts(`/api/products.json`);
      const product = products.find((p) => p.itemId === itemPage);

      if (!product) throw new Error('Product not found');

      return product;
    },
    enabled: !!itemPage,
    staleTime: Infinity, // Data will never become stale
    gcTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // Find the current item from pre-loaded options
  const currentItem = useMemo(() => {
    if (!itemOptions || !itemPage) return null;

    return itemOptions.find((item) => item.id === itemPage) || null;
  }, [itemOptions, itemPage]);

  const isLoading = useMemo(
    () => isInitialLoading || isItemOptionsLoading || isProductLoading,
    [isInitialLoading, isItemOptionsLoading, isProductLoading],
  );

  const error = useMemo(
    () => itemOptionsError || productError,
    [itemOptionsError, productError],
  );

  // Simulate initial loading state for UX purposes
  useEffect(() => {
    if (!isItemOptionsLoading && !isProductLoading) {
      const timer = setTimeout(() => {
        setIsInitialLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isItemOptionsLoading, isProductLoading]);

  // Handle item variant changes (color, capacity) without page reload
  const handleItemChange = useCallback(
    (newItemId: string) => {
      if (category) {
        navigate(`/catalog/${category}/${newItemId}`, { replace: true });
      }
    },
    [category, navigate],
  );

  const handlePreviewClick = useCallback((index: number) => {
    setTargetImgIndex(index);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  // TODO
  if (error) {
    return <div>{error.message}</div>;
  }

  if (
    !category ||
    !itemPage ||
    !itemOptions ||
    !currentProduct ||
    !currentItem
  ) {
    return <PageNotFound />;
  }

  return (
    <div className={card}>
      <div className={card__content}>
        <div className={card__top}>
          <BreadCrumbs item={currentItem} />

          <BackButton />

          <h2 className={card__title}>{currentItem.name}</h2>

          <div className={card__imgBlock}>
            <img
              src={`/${currentItem.images[targetImgIndex]}`}
              alt={`${currentItem.name} photo`}
              className={card__img}
            />
          </div>

          <div className={card__previews}>
            {currentItem.images.map((photo, index) => (
              <div
                className={`
                ${card__sliderBlock}
                ${index === targetImgIndex && card__sliderBlockIsActive}`}
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
            <ColorSelector
              item={currentItem}
              colors={currentItem.colorsAvailable}
              onColorChange={handleItemChange}
              itemOptions={itemOptions}
            />

            <CapacitySelector
              item={currentItem}
              capacityOptions={currentItem.capacityAvailable}
              onCapacityChange={handleItemChange}
              itemOptions={itemOptions}
            />

            <div className={card__actions}>
              {/* TODO what to do with a discount? */}
              <div className={card__price}>
                <ProductPrice
                  fullPrice={currentProduct.fullPrice}
                  discountedPrice={currentProduct.price}
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

              <Specification
                label="RAM"
                value={currentItem.ram}
                context="page"
              />
            </div>
          </div>
        </div>

        <ProductAbout description={currentItem.description} />

        <ProductSpecs product={currentItem} />

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
