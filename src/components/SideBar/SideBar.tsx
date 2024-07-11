import { useSelector } from 'react-redux';

import { RootState } from '../../store';

import { Header } from '../Header';
import { SideBarLink } from '../SideBarLink';
import { MenuItems } from '../MenuItems';

import styles from './SideBar.module.scss';

export const SideBar = () => {
  const { isOpen } = useSelector((state: RootState) => state.menu);

  return (
    <aside
      className={`${styles.sidebar} ${isOpen ? styles.sidebar__isOpen : styles.sidebar__isClosed}`}
    >
      <div className={styles.sidebar__header}>
        <Header />
      </div>

      <div className={styles.sidebar__content}>
        <nav className={styles.sidebar__nav}>
          <MenuItems />
        </nav>

        <div className={styles.sidebar__footer}>
          <div className={styles.sidebar__linkWrapper}>
            <SideBarLink image="icons/emty-heart.svg" url="/" name="fav" />
          </div>

          <div className={styles.sidebar__linkWrapper}>
            <SideBarLink image="icons/icon-cart.svg" url="/" name="cart" />
          </div>
        </div>
      </div>
    </aside>
  );
};
