import { useAppSelector } from '../../hooks';

import { ButtonPrimary } from '../ButtonPrimary';

import styles from './TotalAmount.module.scss';
const { total, total__priceBlock, total__price, total__amount, total__line } =
  styles;

export const Total = () => {
  const { cartItems } = useAppSelector((state) => state.cart);

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
        additionalStyles={{ fontWeight: '600' }}
      />
    </div>
  );
};
