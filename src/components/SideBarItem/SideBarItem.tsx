import { NavItem } from '../NavItem';
import { NavItem as NavItemType } from '../../types/NavItem';

import styles from './SideBarItem.module.scss';

export const SideBarItem = ({ url, name }: NavItemType) => {
  return (
    <div className={styles.sideBarItem}>
      <NavItem url={url} name={name} />
    </div>
  );
};
