import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchProducts } from '../utils/fetchProducts';

import { Product } from '../types/Product';
import { Category } from '../types/CategoryTypes';
import { DropDownSortOptions } from '../types/DropDownSortOptions';

export const useProducts = (
  category: Category,
  sortBy: DropDownSortOptions,
  productsUrl?: string,
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { favoriteItems } = useSelector((state: RootState) => state.favorites);

  const sortProducts = (productsToSort: Product[]) => {
    switch (sortBy) {
      case DropDownSortOptions.age:
        return [...productsToSort].sort((a, b) => b.year - a.year);
      case DropDownSortOptions.title:
        return [...productsToSort].sort((a, b) => a.name.localeCompare(b.name));
      case DropDownSortOptions.price:
        return [...productsToSort].sort(
          (a, b) =>
            a.fullPrice - (a.price || 0) - (b.fullPrice - (b.price || 0)),
        );
      default:
        return productsToSort;
    }
  };

  useEffect(() => {
    if (category === 'favourites') {
      setProducts(sortProducts(favoriteItems));
    } else if (productsUrl) {
      fetchProducts(productsUrl).then((items: Product[]) => {
        const categoryProducts = items.filter(
          (item) => item.category === category,
        );
        setProducts(sortProducts(categoryProducts));
      });
    }
  }, [category, productsUrl, favoriteItems, sortBy]);

  return products;
};
