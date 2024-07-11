import React, { useEffect, useState } from 'react';

import { ProductSliderButton } from '../ProductSliderButton';
import { Product } from '../Product';
import { Product as ProductType } from '../../types/Product';

import styles from './ProductSlider.module.scss';

type Props = {
  title: string;
  apiUrl: string;
  discount: boolean;
  newOnly: boolean;
};

// TODO find a solution for an offset
// FIXME title when its 3 lines

export const ProductSlider = ({ title, apiUrl, discount, newOnly }: Props) => {
  // TODO how to type it (Promise) generic?
  const getProducts = async (): Promise<ProductType[]> => {
    return fetch(apiUrl).then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Failed to fetch products');
    });
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        const preparedProducts = newOnly
          ? productsData.filter((product) => product.year === 2022)
          : productsData.filter((product) => product.year !== 2022);

        setProducts(preparedProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  // #region click handlers
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, Math.max(products.length - 1, 0)),
    );
  };
  // #endregion

  // #region conditions
  const productsStartPosition = currentIndex === 0;
  const productsEndPosition = currentIndex === products.length;
  // #endregion

  const {
    productSlider,
    productSlider__wrapper,
    productSlider__title,
    productSlider__buttonsWrapper,
    productSlider__carousel,
    productSlider__carouselWrapper,
  } = styles;

  return (
    <div className={productSlider}>
      <div className={productSlider__wrapper}>
        <h2 className={productSlider__title}>{title}</h2>

        {/* TODO delete after */}
        {/* {products.length} */}

        <div className={productSlider__buttonsWrapper}>
          <ProductSliderButton
            direction="left"
            onClick={handlePrevClick}
            disabled={productsStartPosition}
          />

          <ProductSliderButton
            direction="right"
            onClick={handleNextClick}
            disabled={productsEndPosition}
          />
        </div>

        <div className={productSlider__carouselWrapper}>
          <div
            className={productSlider__carousel}
            style={
              {
                '--current-index': currentIndex,
              } as React.CSSProperties
            }
          >
            {products.map((item, index) => (
              <Product product={item} discount={discount} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
