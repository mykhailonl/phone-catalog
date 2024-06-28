import { useEffect, useState } from 'react';

import { ProductSliderButton } from '../ProductSliderButton';
import { Product } from '../Product';
import { Product as ProductType } from '../../types/Product';

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
      Math.min(prevIndex + 1, Math.max(products.length - 3, 0)),
    );
  };
  // #endregion

  // #region conditions
  const productsStartPosition = currentIndex === 0;
  const productsEndPosition = currentIndex === products.length;
  // #endregion

  return (
    <div className="px-content md:px-content-md lg:px-content-lg my-14 grid md:my-16 lg:my-20">
      <div className="grid-cols-mobile md:grid-cols-tablet gap-16px lg:grid-cols-desktop prose md:prose-md lg:prose-lg col-span-full mb-0 grid">
        <h2 className="col-span-2 mb-0 justify-self-start">{title}</h2>

        {products.length}

        <div className="col-span-2 flex items-center gap-4 justify-self-end">
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

        <div className="grid-cols-mobile md:grid-cols-tablet lg:grid-cols-desktop gap-16px col-span-full grid">
          <div
            className="gap-16px col-span-full grid grid-flow-col transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {products.map((item, index) => (
              <div className="col-span-3" key={index}>
                <Product product={item} discount={discount} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
