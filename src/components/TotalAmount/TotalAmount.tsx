import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import { ButtonPrimary } from '../ButtonPrimary';

import styles from './TotalAmount.module.scss';
const { total, total__priceBlock, total__price, total__amount, total__line } =
  styles;

export const Total = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const totalCost = cartItems.reduce(
    (total, current) => total + current.product.fullPrice * current.quantity,
    0,
  );
  const totalProducts = cartItems.reduce(
    (totalAmount, current) => totalAmount + current.quantity,
    0,
  );

  return (
    <div className={total}>
      <div className={total__priceBlock}>
        <h1 className={total__price}>{`$${totalCost}`}</h1>

        <p className={total__amount}>
          {`Total for ${totalProducts} ${totalProducts > 1 ? 'items' : 'item'}`}
        </p>
      </div>

      <div className={total__line} />

      <ButtonPrimary
        buttonText="Checkout"
        action={() => console.log('Hey there')}
        disabled={false}
      />
    </div>
  );
};
