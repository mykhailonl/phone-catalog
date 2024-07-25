import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../features/favorites/favoriteSlice';
import { addToCart, removeFromCart } from '../../features/cart/cartSlice';

import { Product } from '../../types/Product';

import styles from './ProductActions.module.scss';

const {
  buttons,
  buttons__cart,
  buttons__favourite,
  buttons__favImg,
  white,
  green,
  elements,
} = styles;

type Props = {
  product: Product;
};

// TODO create product as props to push into fav/cart

export const ProductActions = ({ product }: Props) => {
  const dispatch = useDispatch();

  const { favoriteItems } = useSelector((state: RootState) => state.favorites);
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // #region handlers
  const handleFavClick = (product: Product) => {
    if (favoriteItems.some((item) => item.id === product.id)) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const handleAddToCartClick = (product: Product) => {
    if (cartItems.some((item) => item.product.id === product.id)) {
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
    return cartItems.some((item) => item.product.id === id);
  };

  // #region conditions
  const isInCart = inCart(product.id);
  const isInFavorites = inFavorites(product.id);

  const cartButtonText = isInCart ? 'Added' : 'Add to cart';
  const additionalCartButtonStyles = isInCart
    ? { backgroundColor: white, color: green, borderColor: elements }
    : {};

  const additionalFavButtonStyles = isInFavorites
    ? { borderColor: elements }
    : {};
  // #endregion

  return (
    <div className={buttons}>
      <button
        className={buttons__cart}
        onClick={handleCartClickWithDelay}
        style={additionalCartButtonStyles}
        disabled={isButtonDisabled}
      >
        {cartButtonText}
      </button>

      <button
        className={buttons__favourite}
        onClick={handleFavClickWithDelay}
        disabled={isButtonDisabled}
        style={additionalFavButtonStyles}
      >
        <img
          src={isInFavorites ? '/icons/fav-heart.svg' : '/icons/emty-heart.svg'}
          alt="favorite button"
          className={buttons__favImg}
        />
      </button>
    </div>
  );
};
