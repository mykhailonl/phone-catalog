import { useSelector } from 'react-redux';

import { RootState } from '../../store';

import { Header } from '../Header';
import { SideBarLink } from '../SideBarLink';
import { MenuItems } from '../MenuItems';

import styles from './SideBar.module.scss';

// TODO fix vertical scrolling
// TODO add text hover

export const SideBar = () => {
  const { isOpen } = useSelector((state: RootState) => state.menu);

  return (
    <aside
      className={`${styles.menu} ${isOpen ? styles.menu__isOpen : styles.menu__isClosed}`}
    >
      <div className={styles.menu__header}>
        <Header />
      </div>

      <div className="flex flex-grow flex-col justify-between">
        <nav className={`mt-6 flex flex-col gap-16px px-content`}>
          <MenuItems />
        </nav>

        <div className={`flex w-full border border-solid border-gray-300`}>
          <div className="flex h-16 flex-grow">
            <SideBarLink image="icons/emty-heart.svg" url="/" />
          </div>

          <div className="flex h-16 flex-grow">
            <SideBarLink image="icons/icon-cart.svg" url="/" />
          </div>
        </div>
      </div>
    </aside>
  );
};
