import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { removeFromCart, addToCart } from '../../features/cart/cartSlice';

import { Button } from '../Button';

import { Product } from '../../types/Product';

import styles from './CartItem.module.scss';
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
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cart);

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
  const productPageUrl = `/${product.category}/${product.itemId}`;

  // #region conditions
  const minusButtonDisabled = currentItem.quantity === 1;
  // #endregion

  // #region additionalStyles
  const deleteButtonStyles = {
    'border-color': 'transparent',
    opacity: '50%',
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
          src={product.image}
          alt={`${product.name} image`}
          className={item__img}
        />

        <Link to={productPageUrl}>
          <p className={item__name}>{product.name}</p>
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
