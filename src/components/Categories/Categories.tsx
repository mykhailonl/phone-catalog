import { Category } from '../Category';

import styles from './Categories.module.scss';

// TODO make an util func for fetch?

// Do I need this func or pass products inside?
// const fetchCategoryLength = async (link: string) => {
//   return fetch(link).then((response) => {
//     if (response.ok) {
//       return response.json();
//     }

//     throw new Error('Failed to fetch users');
//   });
// };

export const Categories = () => {
  const { categories, categories__title } = styles;

  return (
    <div className={categories}>
      <h2 className={categories__title}>Shop by category</h2>

      <Category
        name="Mobile phones"
        photo="/img/category-phones.webp"
        url="phones"
        products="/api/phones.json"
      />

      <Category
        name="Tablets"
        photo="/img/category-tablets.webp"
        url="tablets"
        products="/api/tablets.json"
      />

      <Category
        name="Accessories"
        photo="/img/category-accessories.webp"
        url="accessories"
        products="/api/accessories.json"
      />
    </div>
  );
};
