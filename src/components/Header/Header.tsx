import React from 'react';
import { Logo } from '../Logo';
import styles from './Header.module.scss';

type Props = {
  onBurgerClick: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};

export const Header = ({ onBurgerClick, isOpen }: Props) => {
  return (
    <header
      id="header"
      className={`${styles.header__shadow} flex h-12 w-full items-center justify-between`}
    >
      <div className="flex items-center px-4 py-[13px]">
        <div className="h-[22px] w-16">
          <Logo />
        </div>
      </div>

      <div className={`${styles['header__button-shadow']} flex h-12 w-12 p-4`}>
        <button
          onClick={() => onBurgerClick(true)}
          className="flex h-4 w-4 items-center justify-center"
        >
          <img
            src={
              !isOpen ? 'icons/header-burger-menu.svg' : 'icons/icon-close.svg'
            }
            alt="menu"
          />
        </button>
      </div>
    </header>
  );
};
