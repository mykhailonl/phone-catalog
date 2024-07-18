import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../features/favorites/favoriteSlice';
import { addToCart, removeFromCart } from '../../features/cart/cartSlice';

import { Product as ProductType } from '../../types/Product';
import { Specification } from '../Specification';

import styles from './Product.module.scss';
const {
  prod,
  prod__contentWrapper,
  prod__imgWrapper,
  prod__img,
  prod__link,
  prod__buttonLink,
  prod__priceWrapper,
  prod__price,
  prod__discount,
  prod__line,
  prod__specs,
  prod__buttonWrapper,
  prod__cartButton,
  prod__favButton,
  prod__favImg,
  white,
  green,
  elements,
} = styles;

type Props = {
  product: ProductType;
  discount: boolean;
};

export const Product = ({ product, discount }: Props) => {
  const dispatch = useDispatch();
  const { category } = useParams();

  const { favoriteItems } = useSelector((state: RootState) => state.favorites);
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // #region handlers
  const handleFavClick = (product: ProductType) => {
    if (favoriteItems.some((item) => item.id === product.id)) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const handleAddToCartClick = (product: ProductType) => {
    if (cartItems.some((item) => item.id === product.id)) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  };

  const withDelay = (callback: () => void, delay: number = 300) => {
    return () => {
      if (isButtonDisabled) return;

      setIsButtonDisabled(true);
      callback();

      setTimeout(() => {
        setIsButtonDisabled(false);
      }, delay);
    };
  };

  const handleFavClickWithDelay = withDelay(() => handleFavClick(product));
  const handleCartClickWithDelay = withDelay(() =>
    handleAddToCartClick(product),
  );
  // #endregion

  const inFavorites = (id: number) => {
    return favoriteItems.some((item) => item.id === id);
  };

  const inCart = (id: number) => {
    return cartItems.some((item) => item.id === id);
  };

  // #region conditions
  const isInCart = inCart(product.id);
  const isInFavorites = inFavorites(product.id);

  const cartButtonText = isInCart ? 'Added to cart' : 'Add to cart';
  const additionalCartButtonStyles = isInCart
    ? { backgroundColor: white, color: green, borderColor: elements }
    : {};

  const additionalFavButtonStyles = isInFavorites
    ? { borderColor: elements }
    : {};
  // #endregion

  const linkTo = category
    ? `${product.itemId}`
    : `${product.category}/${product.itemId}`;

  return (
    <div className={prod}>
      <div className={prod__contentWrapper}>
        <div className={prod__imgWrapper}>
          <img
            src={product.image}
            alt={`${product.image} photo`}
            className={prod__img}
          />
        </div>

        <Link to={linkTo} className={prod__link}>
          <button className={prod__buttonLink}>{product.name}</button>
        </Link>
      </div>

      <div className={prod__priceWrapper}>
        {!discount ? (
          <h2 className={prod__price}>${product.fullPrice}</h2>
        ) : (
          <>
            <h2 className={prod__price}>${product.price}</h2>

            <h3 className={prod__discount}>${product.fullPrice}</h3>
          </>
        )}
      </div>

      <div className={prod__line}></div>

      <div className={prod__specs}>
        <Specification label="Screen" value={product.screen} />

        <Specification label="Capacity" value={product.capacity} />

        <Specification label="RAM" value={product.ram} />
      </div>

      <div className={prod__buttonWrapper}>
        <button
          className={prod__cartButton}
          onClick={handleCartClickWithDelay}
          style={additionalCartButtonStyles}
          disabled={isButtonDisabled}
        >
          {cartButtonText}
        </button>

        <button
          className={prod__favButton}
          onClick={handleFavClickWithDelay}
          disabled={isButtonDisabled}
          style={additionalFavButtonStyles}
        >
          <img
            src={
              isInFavorites ? '/icons/fav-heart.svg' : '/icons/emty-heart.svg'
            }
            alt="favorite button"
            className={prod__favImg}
          />
        </button>
      </div>
    </div>
  );
};
