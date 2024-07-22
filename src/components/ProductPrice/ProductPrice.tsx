import styles from './ProductPrice.module.scss';

const { actual__price, full__price, card__context, page__context } = styles;

type Props = {
  fullPrice: number;
  discountedPrice: number;
  discount?: boolean;
  context?: 'card' | 'page';
};

export const ProductPrice = ({
  fullPrice,
  discountedPrice,
  discount,
  context,
}: Props) => {
  const contextClass = context === 'card' ? card__context : page__context;

  return (
    <>
      {!discount ? (
        <h2 className={`${actual__price} ${contextClass}`}>${fullPrice}</h2>
      ) : (
        <>
          <h2 className={`${actual__price} ${contextClass}`}>
            ${discountedPrice}
          </h2>

          <h3 className={`${full__price} ${contextClass}`}>${fullPrice}</h3>
        </>
      )}
    </>
  );
};
