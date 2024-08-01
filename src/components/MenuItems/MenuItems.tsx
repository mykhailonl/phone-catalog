import { SideBarItem } from '../SideBarItem';

// TODO check underline (needs to stick to the bottom)

export const MenuItems = () => {
  return (
    <>
      <SideBarItem url="/" name="Home" />

      <SideBarItem url="/catalog/phones" name="Phones" />

      <SideBarItem url="/catalog/tablets" name="Tablets" />

      <SideBarItem url="/catalog/accessories" name="Accessories" />
    </>
  );
};
