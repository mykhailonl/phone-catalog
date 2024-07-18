import { useParams } from 'react-router-dom';
import { ProductList } from '../ProductList';
import { PageNotFound } from '../PageNotFound';

export type Category = 'phones' | 'tablets' | 'accessories';
export enum CategoryEnum {
  Phones = 'phones',
  Tablets = 'tablets',
  Accessories = 'accessories',
}

export const ProductListWrapper = () => {
  const { category } = useParams<{ category: Category }>();

  const titles: Record<Category, string> = {
    phones: 'Mobile phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
  };

  const productsUrl = './api/products.json';

  if (
    !category ||
    !Object.values(CategoryEnum).includes(category as CategoryEnum)
  ) {
    return <PageNotFound />;
  }

  return (
    <ProductList
      title={titles[category]}
      productsUrl={productsUrl}
      category={category}
    />
  );
};
