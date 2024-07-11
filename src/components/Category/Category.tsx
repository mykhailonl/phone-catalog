import { Link } from 'react-router-dom';

import styles from './Category.module.scss';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../../utils/fetchProducts';

type Props = {
  photo: string;
  name: 'Mobile phones' | 'Tablets' | 'Accessories';
  products: string;
  url: string;
};

// TODO fix bg-color for categories
// TODO move img, add bg and position

export const Category = ({ photo, name, products, url }: Props) => {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    fetchProducts(products).then((items) => setAmount(items.length));
  }, []);

  const {
    category,
    category__link,
    category__imgWrapper,
    category__img,
    category__description,
    category__name,
    category__amount,
  } = styles;

  return (
    <div className={category}>
      <Link className={category__link} to={url}>
        <div className={`${category__imgWrapper}`}>
          <img src={photo} alt={`${name} category`} className={category__img} />
        </div>
      </Link>

      <div className={category__description}>
        {/* TODO params on other screen */}
        <h3 className={category__name}>{name}</h3>

        <p className={category__amount}>{amount} models</p>
      </div>
    </div>
  );
};
