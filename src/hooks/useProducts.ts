import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../hooks';
import { fetchProducts } from '../utils/fetchProducts';

import { Product } from '../types/Product';
import { Category } from '../types/CategoryTypes';
import { DropDownSortOptions } from '../types/DropDownSortOptions';

type UseProductsReturn = {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
};

export const useProducts = (
  category: Category,
  sortBy: DropDownSortOptions,
  productsUrl?: string,
): UseProductsReturn => {
  const { favoriteItems } = useAppSelector((state) => state.favorites);

  // Function to sort products based on the selected option
  const sortProducts = (productsToSort: Product[]): Product[] => {
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

  // Using React Query to fetch and manage products data
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery<Product[], Error>({
    queryKey: ['products', category, productsUrl],
    queryFn: async () => {
      if (!productsUrl) return [];

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const fetchedProducts: Product[] = await fetchProducts(productsUrl);

      return fetchedProducts.filter((product) => product.category === category);
    },
    enabled: !!productsUrl && category !== 'favourites',
    refetchOnMount: 'always', // Always refetch on mount
    refetchInterval: 0, // Disable automatic refetching
  });

  // Sorting products based on the selected option
  const sortedProducts = sortProducts(
    category === 'favourites' ? favoriteItems : products,
  );

  return { products: sortedProducts, isLoading, error: error || null };
};
