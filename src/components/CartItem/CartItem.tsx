import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { removeFromCart, addToCart } from '../../features/cart/cartSlice';

import { Button } from '../Button';

import { Product } from '../../types/Product';

import styles from './CartItem.module.scss';
import { useEffect } from 'react';
const {
  item,
  item__row,
  item__img,
  item__name,
  item__counter,
  item__amount,
  item__cost,
} = styles;

type Props = {
  product: Product;
};

// FIXME width?

export const CartItem = ({ product }: Props) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);

  const isInCart = location.pathname.startsWith('/user/cart');

  useEffect(() => console.log(product), [product]);
  // #region handler functions
  const deleteProduct = (productId: number) => {
    dispatch(removeFromCart(productId));
  };
  const addProduct = (product: Product) => {
    dispatch(addToCart(product));
  };
  // #endregion

  const currentItem = cartItems.find((item) => item.product.id === product.id);

  if (!currentItem) {
    return;
  }

  const productCost = currentItem.product.fullPrice * currentItem.quantity;
  const productPageUrl = `/catalog/${product.category}/${product.itemId}`;

  // #region conditions
  const minusButtonDisabled = currentItem.quantity === 1;
  // #endregion

  // #region additionalStyles
  const deleteButtonStyles = {
    borderColor: 'transparent',
    opacity: '50%',
    padding: '0',
  };
  const minusButtonStyles = minusButtonDisabled
    ? {
        opacity: '50%',
      }
    : {};
  const plusButtonStyles = {
    borderColor: '#B4BDC3',
  };
  // #endregion

  return (
    <div className={item}>
      <div className={item__row}>
        <Button
          bgImg={'/icons/icon-close.svg'}
          action={() => deleteProduct(product.id)}
          disabled={false}
          additionalStyles={deleteButtonStyles}
        />

        <img
          src={`/${product.image}`}
          alt={`${product.name} image`}
          className={item__img}
        />

        <Link
          to={productPageUrl}
          className={item__name}
          state={isInCart && { from: 'user', previousPath: location.pathname }}
        >
          <p>{product.name}</p>
        </Link>
      </div>

      <div className={item__row}>
        <div className={item__counter}>
          <Button
            bgImg={'/icons/icon-minus.svg'}
            disabled={minusButtonDisabled}
            additionalStyles={minusButtonStyles}
            action={() => deleteProduct(product.id)}
          />

          <p className={item__amount}>{currentItem.quantity}</p>

          <Button
            bgImg={'/icons/icon-plus.svg'}
            disabled={false}
            action={() => addProduct(product)}
            additionalStyles={plusButtonStyles}
          />
        </div>

        <span className={item__cost}>{`$${productCost}`}</span>
      </div>
    </div>
  );
};
