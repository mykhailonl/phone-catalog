import { NavItem } from '../NavItem';
import { NavItem as NavItemType } from '../../types/NavItem';

export const SideBarItem = ({ url, name }: NavItemType) => {
  return (
    <div className="flex justify-center py-2">
      <NavItem url={url} name={name} />
    </div>
  );
};
