import { Link } from 'react-router-dom';
import { NavItem as NavItemType } from '../../types/NavItem';

export const NavItem = ({ url, name }: NavItemType) => {
  return (
    <Link to={url} className="no-underline">
      <div className="text-secondary hover:text-gray-primary flex font-extrabold uppercase">
        {name}
      </div>
    </Link>
  );
};
