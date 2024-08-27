import { useMemo } from 'react';

import { useProducts } from '../../hooks/useProducts';
import {
  ParamValue,
  useSearchParamValue,
} from '../../hooks/useSearchParamValue';

import { BreadCrumbs } from '../BreadCrumbs';
import { CategoryTitleBlock } from '../CategoryTitleBlock';
import { DropDown } from '../Dropdown';
import { Pagination } from '../Pagination';
import { Product } from '../Product/Product';
import { Loader } from '../Loader';

import { ProductListType } from '../../types/ProductList';
import {
  DropDownSort,
  SORT_OPTIONS_VALUES,
  SortKey,
  getSortKeyFromOption,
  getSortOptionFromKey,
} from '../../types/DropDownSortOptions';
import {
  DropDownItemsPerPage,
  ITEMS_PER_PAGE_OPTIONS,
} from '../../types/DropDownItemsPerPage';

import styles from './ProductList.module.scss';
const { list, list__content, list__dropdowns, list__products } = styles;

// Configuration for the sort dropdown
const sortByDropdown: DropDownSort = {
  name: 'Sort by',
  urlSearchName: 'sort',
  values: SORT_OPTIONS_VALUES,
};

// Configuration for the items per page dropdown
const itemsDropdown: DropDownItemsPerPage = {
  name: 'Items on page',
  urlSearchName: 'perPage',
  values: ITEMS_PER_PAGE_OPTIONS,
};

export const ProductList = ({
  title,
  productsUrl,
  category,
}: ProductListType) => {
  // #region URLSearchParams
  const [page, setPage] = useSearchParamValue('page', 1);
  const [perPage, setPerPage] = useSearchParamValue(
    'perPage',
    ITEMS_PER_PAGE_OPTIONS[3],
  );
  const [sortBy, setSortBy] = useSearchParamValue(
    'sort',
    getSortKeyFromOption('Newest') as ParamValue,
  );
  // #endregion

  const { products, isLoading, error } = useProducts(
    category,
    getSortOptionFromKey(sortBy as SortKey),
    productsUrl,
  );

  const paginatedProducts = useMemo(() => {
    if (perPage === 'All') return products;

    const startIndex = Number(+page - 1) * Number(perPage);

    return products.slice(startIndex, startIndex + Number(perPage));
  }, [products, page, perPage]);

  // #region Loading/Error handling
  if (isLoading) return <Loader />;
  // TODO create error component
  if (error)
    return (
      <div>
        Error: {error instanceof Error ? error.message : 'An error occurred'}
      </div>
    );
  if (!products) return null;
  // #endregion

  // #region conditions
  const dropdownsVisible = category !== 'favourites';
  const paginationVisible =
    perPage !== 'All' && products.length > Number(perPage);
  const totalPages = Math.ceil(products.length / Number(perPage));
  // #endregion

  return (
    <div className={list}>
      <BreadCrumbs />

      <div className={list__content}>
        <CategoryTitleBlock
          categoryName={title}
          categoryAmount={products.length}
        />

        {dropdownsVisible && (
          <div className={list__dropdowns}>
            <DropDown
              dropdownConfig={sortByDropdown}
              value={sortBy}
              onChange={setSortBy}
            />

            <DropDown
              dropdownConfig={itemsDropdown}
              value={perPage}
              onChange={setPerPage}
            />
          </div>
        )}

        <div className={list__products}>
          {paginatedProducts.map((prod) => (
            <Product
              product={prod}
              discount={false}
              key={prod.id}
              isInCategory={true}
            />
          ))}
        </div>

        {paginationVisible && (
          <Pagination
            currentPage={+page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
};
