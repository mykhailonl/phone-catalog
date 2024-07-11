// TODO add underline inside a header if located in favourites
// TODO breadcrumbs?
import { useEffect, useState } from 'react';
import { Item } from '../../types/Item';
import { fetchProducts } from '../../utils/fetchProducts';

import styles from './ProductList.module.scss';

type Props = {
  title: string;
  productsUrl: string;
};

export const ProductList = ({ title, productsUrl }: Props) => {
  const [products, setProducts] = useState<Item[]>([]);

  useEffect(() => {
    fetchProducts(productsUrl).then((items) => setProducts(items));
  }, []);

  // #region styles
  const { list, list__content, list__title, list__titleBlock, list__amount } =
    styles;
  // #endregion

  return (
    <div className={list}>
      <div className={list__content}>
        <div className={list__titleBlock}>
          <h1 className={list__title}>{title}</h1>

          <p className={list__amount}>{products.length} models</p>
        </div>
      </div>
    </div>
  );
};
