import React from 'react';

import { Header } from '../Header';
import { SideBarItem } from '../SideBarItem';
import { SideBarLink } from '../SideBarLink';

type Props = {
  onBurgerClick: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};

// TODO fix vertical scrolling
// TODO add text hover

export const SideBar = ({ isOpen, onBurgerClick }: Props) => {
  return (
    <aside
      className={`fixed top-0 h-screen w-full transform bg-white transition-transform ${isOpen ? 'translate-y-0' : '-translate-y-full'} prose z-20 duration-500`}
    >
      <Header isOpen={isOpen} onBurgerClick={() => onBurgerClick(!isOpen)} />

      {/* TODO position */}
      <div className="flex flex-col">
        <nav className="px-content gap-16px mt-6 flex flex-col">
          {/* TODO check links */}
          <SideBarItem url="/" name="Home" />

          <SideBarItem url="/" name="Phones" />

          <SideBarItem url="/" name="Tablets" />

          <SideBarItem url="/" name="Accessories" />
        </nav>

        <div className="flex w-full">
          <SideBarLink image="icons/emty-heart.svg" url="/" />

          <SideBarLink image="icons/icon-cart.svg" url="/" />
        </div>
      </div>
    </aside>
  );
};
