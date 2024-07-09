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
    <div className="col-span-full my-14 flex flex-col gap-8 px-content md:px-0">
      <h2 className="m-0 mb-6 text-gray-primary">Shop by category</h2>

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
