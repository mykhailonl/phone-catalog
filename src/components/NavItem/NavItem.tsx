import { Link } from 'react-router-dom';
import { NavItem as NavItemType } from '../../types/NavItem';

import styles from './NavItem.module.scss';

export const NavItem = ({ url, name }: NavItemType) => {
  return (
    <Link to={url} className={styles.item}>
      <div className={styles.item__content}>
        {name}
        <span className={styles.item__underline}></span>
      </div>
    </Link>
  );
};
