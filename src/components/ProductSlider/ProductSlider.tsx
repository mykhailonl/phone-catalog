import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../../utils/fetchProducts';

import { ProductSliderButton } from '../ProductSliderButton';
import { Product } from '../Product';

import { Product as ProductType } from '../../types/Product';

import styles from './ProductSlider.module.scss';
const {
  productSlider,
  productSlider__wrapper,
  productSlider__title,
  productSlider__buttonsWrapper,
  productSlider__carousel,
  productSlider__carouselWrapper,
} = styles;

type Props = {
  title: string;
  apiUrl: string;
  discount: boolean;
  newOnly: boolean;
};

// TODO get rid of states?

export const ProductSlider = ({ title, apiUrl, discount, newOnly }: Props) => {
  const { category } = useParams();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData: ProductType[] = await fetchProducts(apiUrl);
        let preparedProducts = newOnly
          ? productsData.filter((product) => product.year === 2022)
          : productsData.filter((product) => product.year !== 2022);

        if (category) {
          console.log(true);

          const filteredProducts = preparedProducts.filter(
            (product) => product.category === category,
          );
          setProducts(filteredProducts);
        } else {
          setProducts(preparedProducts);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [category, apiUrl, newOnly]);

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

  return (
    <div className={productSlider}>
      <div className={productSlider__wrapper}>
        <h2 className={productSlider__title}>{title}</h2>

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
