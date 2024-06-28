import { Category } from '../Category';

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
  return (
    <div className="prose md:prose-md lg:prose-lg px-content md:px-content-md lg:px-content-lg grid-cols-mobile md:grid-cols-tablet lg:grid-cols-desktop gap-16px grid">
      <h2 className="text-gray-primary col-span-full mb-6">Shop by category</h2>

      <Category
        name="Mobile phones"
        photo="/img/category-phones.webp"
        quantity={100}
        bgColor="bg-mobileCategory"
      />

      <Category
        name="Tablets"
        photo="/img/category-tablets.webp"
        quantity={100}
        bgColor="bg-tabletCategory"
      />

      <Category
        name="Accessories"
        photo="/img/category-accessories.webp"
        quantity={100}
        bgColor="bg-accessoriesCategory"
      />
    </div>
  );
};
