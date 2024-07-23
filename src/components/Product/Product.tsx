import { Link, useParams } from 'react-router-dom';

import { ProductActions } from '../ProductActions';
import { Specification } from '../Specification';

import { Product as ProductType } from '../../types/Product';

import styles from './Product.module.scss';
import { ProductPrice } from '../ProductPrice';
const {
  prod,
  prod__contentWrapper,
  prod__imgWrapper,
  prod__img,
  prod__link,
  prod__buttonLink,
  prod__priceWrapper,
  prod__line,
  prod__specs,
} = styles;

type Props = {
  product: ProductType;
  discount: boolean;
};

export const Product = ({ product, discount }: Props) => {
  const { category } = useParams();

  const linkTo = category
    ? `${product.itemId}`
    : `${product.category}/${product.itemId}`;

  return (
    <div className={prod}>
      <div className={prod__contentWrapper}>
        <div className={prod__imgWrapper}>
          <img
            src={`/${product.image}`}
            alt={`${product.image} photo`}
            className={prod__img}
          />
        </div>

        <Link to={linkTo} className={prod__link}>
          <button className={prod__buttonLink}>{product.name}</button>
        </Link>
      </div>

      <div className={prod__priceWrapper}>
        <ProductPrice
          discountedPrice={product.price}
          fullPrice={product.fullPrice}
          discount={discount}
          context="card"
        />
      </div>

      <div className={prod__line}></div>

      <div className={prod__specs}>
        <Specification label="Screen" value={product.screen} context="card" />

        <Specification
          label="Capacity"
          value={product.capacity}
          context="card"
        />

        <Specification label="RAM" value={product.ram} context="card" />
      </div>

      <ProductActions product={product} />
    </div>
  );
};
