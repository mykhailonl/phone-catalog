import { SideBarItem } from '../SideBarItem';

// TODO check underline (needs to stick to the bottom)

export const MenuItems = () => {
  return (
    <>
      <SideBarItem url="/" name="Home" />

      <SideBarItem url="phones" name="Phones" />

      <SideBarItem url="tablets" name="Tablets" />

      <SideBarItem url="accessories" name="Accessories" />
    </>
  );
};
