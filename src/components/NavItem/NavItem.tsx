import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../../features/sideBar/sideBarSlice';

import { NavItem as NavItemType } from '../../types/NavItem';

import styles from './NavItem.module.scss';

export const NavItem = ({ url, name }: NavItemType) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleMenu());
  };

  return (
    <Link to={url} className={styles.item} onClick={handleClick}>
      <div className={styles.item__content}>
        {name}
        <span className={styles.item__underline}></span>
      </div>
    </Link>
  );
};
