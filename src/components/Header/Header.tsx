import { useDispatch, useSelector } from 'react-redux';

import { toggleMenu } from '../../features/sideBar/sideBarSlice';
import { RootState } from '../../store';

import styles from './Header.module.scss';

import { Logo } from '../Logo';
import { SideBarLink } from '../SideBarLink';
import { MenuItems } from '../MenuItems';

const {
  header,
  header__logo,
  header__logo__block,
  header__burger,
  header__links,
  header__buttons,
  header__buttonWrapper,
} = styles;

export const Header = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.menu);

  const { favoriteItems } = useSelector((state: RootState) => state.favorites);
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const favItemsAmount = favoriteItems.length;
  const cartItemsAmount = cartItems.length;

  return (
    <header id="header" className={header}>
      <div className={header__logo}>
        <div className={header__logo__block}>
          <Logo />
        </div>
      </div>

      <button className={header__burger} onClick={() => dispatch(toggleMenu())}>
        <img
          src={
            !isOpen ? 'icons/header-burger-menu.svg' : 'icons/icon-close.svg'
          }
          alt="menu"
        />
      </button>

      <div className={header__links}>
        <MenuItems />
      </div>

      {/* TODO rename component for the links and maybe move to wrapper component? */}
      <div className={header__buttons}>
        <div className={header__buttonWrapper}>
          <SideBarLink
            image="icons/emty-heart.svg"
            url="favourites"
            amount={favItemsAmount}
            name="fav"
          />
        </div>

        <div className={header__buttonWrapper}>
          <SideBarLink
            image="icons/icon-cart.svg"
            url="cart"
            amount={cartItemsAmount}
            name="cart"
          />
        </div>
      </div>
    </header>
  );
};
