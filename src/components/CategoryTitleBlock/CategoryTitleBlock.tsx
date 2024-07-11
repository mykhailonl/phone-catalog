import styles from './CategoryTitleBlock.module.scss';

type Props = {
  categoryName: string;
  categoryAmount: number;
};

// TODO refactor title block from homepage and from ProductList,
// add some flag to understand where located and add custom styles
// (different fz and gap)

export const CategoryTitleBlock = ({ categoryName, categoryAmount }: Props) => {
  const { block, block__name, block__amount } = styles;

  return (
    <div className={block}>
      <h1 className={block__name}>{categoryName}</h1>

      <p className={block__amount}>{categoryAmount}</p>
    </div>
  );
};
