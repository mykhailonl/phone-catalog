import { Category } from '../Category';

import styles from './Categories.module.scss';
const { categories, categories__title } = styles;

export const Categories = () => {
  return (
    <div className={categories}>
      <h2 className={categories__title}>Shop by category</h2>

      <Category
        name="Mobile phones"
        photo="/img/category-phones.webp"
        url="/catalog/phones"
        products="/api/phones.json"
      />

      <Category
        name="Tablets"
        photo="/img/category-tablets.webp"
        url="/catalog/tablets"
        products="/api/tablets.json"
      />

      <Category
        name="Accessories"
        photo="/img/category-accessories.webp"
        url="/catalog/accessories"
        products="/api/accessories.json"
      />
    </div>
  );
};
