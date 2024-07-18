import { useSelector } from 'react-redux';

import { RootState } from '../../store';

import { Header } from '../Header';
import { SideBarLink } from '../SideBarLink';
import { MenuItems } from '../MenuItems';

import styles from './SideBar.module.scss';

const {
  sidebar,
  sidebar__isOpen,
  sidebar__isClosed,
  sidebar__header,
  sidebar__content,
  sidebar__nav,
  sidebar__footer,
  sidebar__linkWrapper,
} = styles;

export const SideBar = () => {
  const { isOpen } = useSelector((state: RootState) => state.menu);
  const { favoriteItems } = useSelector((state: RootState) => state.favorites);
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const favItemsAmount = favoriteItems.length;
  const cartItemsAmount = cartItems.length;

  return (
    <aside
      className={`${sidebar} ${isOpen ? sidebar__isOpen : sidebar__isClosed}`}
    >
      <div className={sidebar__header}>
        <Header />
      </div>

      <div className={sidebar__content}>
        <nav className={sidebar__nav}>
          <MenuItems />
        </nav>

        <div className={sidebar__footer}>
          <div className={sidebar__linkWrapper}>
            <SideBarLink
              image="icons/emty-heart.svg"
              url="favourites"
              name="fav"
              amount={favItemsAmount}
            />
          </div>

          <div className={sidebar__linkWrapper}>
            <SideBarLink
              image="icons/icon-cart.svg"
              url="/"
              name="cart"
              amount={cartItemsAmount}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
