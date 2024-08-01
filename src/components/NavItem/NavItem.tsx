import { Link } from 'react-router-dom';
import { toggleMenu } from '../../features/sideBar/sideBarSlice';
import { setScrollToTop } from '../../features/scroll/scrollSlice';

import { NavItem as NavItemType } from '../../types/NavItem';

import styles from './NavItem.module.scss';
import { useAppDispatch } from '../../hooks';

export const NavItem = ({ url, name }: NavItemType) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setScrollToTop());
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
