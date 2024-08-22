import { useAppDispatch } from '../../hooks.ts';
import { toggleMenu } from '../../features/sideBar/sideBarSlice.ts';
import { setScrollToTop } from '../../features/scroll/scrollSlice.ts';

import styles from './SidebarNavLink.module.scss';
import { NavigationLink } from '../NavigationLink/NavigationLink.tsx';
import { NavigationLinkType } from '../../types/NavigationLinkType.ts';

export const SidebarNavLink = ({ url, name }: NavigationLinkType) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setScrollToTop('auto'));
    dispatch(toggleMenu());
  };

  return (
    <div onClick={handleClick} className={styles.link}>
      <NavigationLink url={url} name={name} />
    </div>
  );
};
