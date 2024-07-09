import { useDispatch, useSelector } from 'react-redux';

import { toggleMenu } from '../../features/sideBar/sideBarSlice';
import { RootState } from '../../store';

import styles from './Header.module.scss';

import { Logo } from '../Logo';
import { SideBarLink } from '../SideBarLink';
import { MenuItems } from '../MenuItems';

export const Header = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.menu);

  return (
    <header id="header" className={styles.header}>
      <div className={styles.header__logo}>
        <div className={styles.header__logo__block}>
          <Logo />
        </div>
      </div>

      <button
        className={styles.header__burger}
        onClick={() => dispatch(toggleMenu())}
      >
        <img
          src={
            !isOpen ? 'icons/header-burger-menu.svg' : 'icons/icon-close.svg'
          }
          alt="menu"
        />
      </button>

      <div className="hidden h-full items-center md:flex md:gap-8 lg:gap-16">
        <MenuItems />
      </div>

      {/* TODO rename component for the links and maybe move to wrapper component? */}
      <div className="hidden flex-grow justify-end md:flex">
        <div className="h-12 w-12 shadow-custom-left">
          <SideBarLink image="icons/emty-heart.svg" url="/" />
        </div>

        <div className="h-12 w-12 shadow-custom-left">
          <SideBarLink image="icons/icon-cart.svg" url="/" />
        </div>
      </div>
    </header>
  );
};
