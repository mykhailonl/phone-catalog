import styles from './CategoryTitleBlock.module.scss';

type Props = {
  categoryName: string;
  categoryAmount: number;
};

const { block, block__name, block__amount } = styles;

export const CategoryTitleBlock = ({ categoryName, categoryAmount }: Props) => {
  return (
    <div className={block}>
      <h1 className={block__name}>{categoryName}</h1>

      <p className={block__amount}>
        {!categoryAmount && categoryName === 'Favourites'
          ? `Favourite list is empty`
          : `${categoryAmount} ${categoryAmount !== 1 ? 'models' : 'model'}`}
      </p>
    </div>
  );
};
