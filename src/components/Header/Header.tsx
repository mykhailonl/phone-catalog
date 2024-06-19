import { Logo } from '../Logo';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div
      className={`${styles.header__shadow} flex h-12 w-full items-center justify-between`}
    >
      <div className="flex h-full items-center px-4 py-[13px]">
        <Logo />
      </div>

      <div className={`${styles['header__button-shadow']} flex p-4`}>
        <button>
          <img
            src="../src/img/icons/header-burger-menu.svg"
            alt="menu"
            className="h-4 w-4"
          />
        </button>
      </div>
    </div>
  );
};
