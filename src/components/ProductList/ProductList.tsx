// TODO add underline inside a header if located in favourites
import { useMemo } from 'react';

import { useProducts } from '../../hooks/useProducts';
import { useSearchParamValue } from '../../hooks/useSearchParamValue';

import { BreadCrumbs } from '../BreadCrumbs';
import { CategoryTitleBlock } from '../CategoryTitleBlock';
import { DropDown } from '../Dropdown';
import { Pagination } from '../Pagination';
import { Product } from '../Product/Product';

import { ProductListType } from '../../types/ProductList';
import {
  DropDownSort,
  DropDownSortOptions,
  SORT_OPTIONS,
} from '../../types/DropDownSortOptions';
import {
  DropDownItemsPerPage,
  ITEMS_PER_PAGE_OPTIONS,
} from '../../types/DropDownItemsPerPage';

import styles from './ProductList.module.scss';

const { list, list__content, list__dropdowns, list__products, list__product } =
  styles;

// Configuration for the sort dropdown
const sortByDropdown: DropDownSort = {
  name: 'Sort by',
  urlSearchName: 'sort',
  values: SORT_OPTIONS,
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
  // Get values from URL parameters
  const [currentPage] = useSearchParamValue('page', 1);
  const [itemsOnPage] = useSearchParamValue(
    'perPage',
    ITEMS_PER_PAGE_OPTIONS[0],
  );
  const [sortBy] = useSearchParamValue('sort', DropDownSortOptions.age);

  // Fetch the list of products
  const products = useProducts(
    category,
    sortBy as DropDownSortOptions,
    productsUrl,
  );

  // Calculate the current items and total number of pages
  const { currentItems, pagesAmount } = useMemo(() => {
    if (itemsOnPage === 'All') {
      return {
        currentItems: products,
        pagesAmount: 1,
      };
    }

    const itemsPerPage = parseInt(itemsOnPage as string, 10);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const lastItemIndex = +currentPage * itemsPerPage;
    const firstItemIndex = (+currentPage - 1) * itemsPerPage;

    return {
      currentItems: products.slice(firstItemIndex, lastItemIndex),
      pagesAmount: totalPages,
    };
  }, [products, itemsOnPage, currentPage]);

  // Determine if dropdowns and pagination should be visible
  const dropdownsVisible = category !== 'favourites';
  const paginationVisible = pagesAmount > 1;

  return (
    <div className={list}>
      <BreadCrumbs />

      <div className={list__content}>
        {!dropdownsVisible ? (
          <CategoryTitleBlock
            categoryName={title}
            categoryAmount={products.length}
          />
        ) : (
          <>
            <CategoryTitleBlock
              categoryName={title}
              categoryAmount={products.length}
            />
            <div className={list__dropdowns}>
              <DropDown dropdownConfig={sortByDropdown} />
              <DropDown dropdownConfig={itemsDropdown} />
            </div>
          </>
        )}

        {/* TODO: Add a wrapper for products and set padding-block to 24px? */}
        <div className={list__products}>
          {currentItems.map((prod, index) => (
            <div key={index} className={list__product}>
              <Product product={prod} discount={false} />
            </div>
          ))}
        </div>

        {paginationVisible && <Pagination pages={pagesAmount} />}
      </div>
    </div>
  );
};
