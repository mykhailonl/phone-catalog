// TODO add underline inside a header if located in favourites
import { useEffect, useState } from 'react';
import { Product as ProductType } from '../../types/Product';
import { fetchProducts } from '../../utils/fetchProducts';

import styles from './ProductList.module.scss';
import { CategoryTitleBlock } from '../CategoryTitleBlock';
import { DropDown } from '../Dropdown';
import {
  DropDownSort,
  DropDownSortOptions,
} from '../../types/DropDownSortOptions';
import {
  DropDownItemsPerPage,
  ItemsPerPageOptions,
} from '../../types/DropDownItemsPerPage';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../Product/Product';
import { Pagination } from '../Pagination';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { BreadCrumbs } from '../BreadCrumbs';

type Props = {
  title: string;
  productsUrl?: string;
  category: 'phones' | 'tablets' | 'accessories' | 'favourites';
};

const { list, list__content, list__dropdowns, list__product } = styles;

const sortByDropdown: DropDownSort = {
  name: 'Sort by',
  urlSearchName: 'sortBy',
  values: ['Newest', 'Oldest', 'Cheapest', 'Expensive'],
};

const itemsDropdown: DropDownItemsPerPage = {
  name: 'Items on page',
  urlSearchName: 'itemsOnPage',
  values: [8, 16, 24, 32],
};

export const ProductList = ({ title, productsUrl, category }: Props) => {
  const {
    currentPage: curLocalPage,
    itemsOnThePage: itemsLocalPage,
    sortBy: localSortBy,
  } = useSelector((state: RootState) => state.pagination);

  // #region products (set and fetch)
  const [products, setProducts] = useState<ProductType[]>([]);
  const { favoriteItems } = useSelector((state: RootState) => state.favorites);

  useEffect(() => {
    if (category === 'favourites') {
      setProducts(favoriteItems);
    } else if (productsUrl) {
      fetchProducts(productsUrl).then((items: ProductType[]) => {
        const categoryProducts = items
          .filter((item) => item.category === category)
          .sort((a, b) => b.year - a.year);
        setProducts(categoryProducts);
      });
    }
  }, [category, productsUrl, favoriteItems]);
  // #endregion

  // #region searchParams
  const [searchParams] = useSearchParams();

  const currentPage = +(searchParams.get('page') || curLocalPage);
  const itemsOnpage = +(
    searchParams.get('itemsOnPage') || itemsLocalPage
  ) as ItemsPerPageOptions;
  const sortBy = (searchParams.get('sortBy') ||
    localSortBy) as DropDownSortOptions;
  // #endregion

  useEffect(() => {
    switch (sortBy) {
      case 'Newest':
        setProducts((prevProducts) =>
          [...prevProducts].sort((a, b) => b.year - a.year),
        );
        break;
      case 'Oldest':
        setProducts((prevProducts) =>
          [...prevProducts].sort((a, b) => a.year - b.year),
        );
        break;
      case 'Cheapest':
        setProducts((prevProducts) =>
          [...prevProducts].sort((a, b) => a.fullPrice - b.fullPrice),
        );
        break;
      case 'Expensive':
        setProducts((prevProducts) =>
          [...prevProducts].sort((a, b) => b.fullPrice - a.fullPrice),
        );
        break;
      default:
        break;
    }
  }, [sortBy]);

  const pagesAmount = Math.ceil(products.length / itemsOnpage);
  const indexOfLastItem = currentPage * itemsOnpage;
  const indexOfFirstItem = indexOfLastItem - itemsOnpage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const dropdownsVisible = category !== 'favourites';
  const pagionationVisible = pagesAmount > 1;

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
            <DropDown dropdownConfig={sortByDropdown} currentValue={sortBy} />

            <DropDown
              dropdownConfig={itemsDropdown}
              currentValue={itemsOnpage}
            />
          </div>
        )}

        {/* TODO add wrapper products div and give it padding-block 24px? */}
        {currentItems.map((prod, index) => (
          <div key={index} className={list__product}>
            <Product product={prod} discount={false} />
          </div>
        ))}

        {pagionationVisible && <Pagination pages={pagesAmount} />}
      </div>
    </div>
  );
};
