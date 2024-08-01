import { toggleMenu } from '../../features/sideBar/sideBarSlice';

import styles from './Header.module.scss';

import { Logo } from '../Logo';
import { SideBarLink } from '../SideBarLink';
import { MenuItems } from '../MenuItems';
import { useAppDispatch, useAppSelector } from '../../hooks';

const {
  header,
  header__content,
  header__logo,
  header__logo__block,
  header__burger,
  header__links,
  header__buttons,
  header__buttonWrapper,
} = styles;

export const Header = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.menu);
  const { favoriteItems } = useAppSelector((state) => state.favorites);
  const { cartItems } = useAppSelector((state) => state.cart);

  const favItemsAmount = favoriteItems.length;
  const cartItemsAmount = cartItems.length;

  return (
    <header id="header" className={header}>
      <div className={header__content}>
        <div className={header__logo}>
          <div className={header__logo__block}>
            <Logo placement="header" />
          </div>
        </div>

        <button
          className={header__burger}
          onClick={() => dispatch(toggleMenu())}
        >
          <img
            src={
              !isOpen
                ? '/icons/header-burger-menu.svg'
                : '/icons/icon-close.svg'
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
              image="/icons/emty-heart.svg"
              url="/user/favourites"
              amount={favItemsAmount}
              name="fav"
            />
          </div>

          <div className={header__buttonWrapper}>
            <SideBarLink
              image="/icons/icon-cart.svg"
              url="/user/cart"
              amount={cartItemsAmount}
              name="cart"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
