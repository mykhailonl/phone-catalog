import { HashLink } from 'react-router-hash-link';

import { NavItem } from '../NavItem';
import { Logo } from '../Logo';

export const Footer = () => {
  return (
    <footer className="prose mt-16 grid grid-cols-mobile gap-16px px-content shadow-custom-top md:prose-md lg:prose-lg md:grid-cols-tablet md:px-content-md lg:grid-cols-desktop lg:px-content-lg">
      <div className="col-span-full flex flex-col gap-8 py-8 md:flex-row md:items-center md:justify-between">
        <div className="flex w-[89px] items-center">
          <Logo />
        </div>

        {/* TODO check hover values (item width) */}
        <nav className="flex w-fit flex-col gap-16px md:flex-row md:justify-between">
          <NavItem url="/" name="Github" />

          <NavItem url="/" name="Contacts" />

          <NavItem url="/" name="Rights" />
        </nav>

        <div className="col-span-full flex items-center justify-center gap-16px">
          <small className="text-secondary">Back to top</small>

          <HashLink
            smooth
            to="#header"
            className={`flex h-8 w-8 items-center justify-center border-[1px]`}
          >
            <div className="flex h-4 w-4 items-center justify-center">
              <img
                src={`/icons/right-arrow.svg`}
                alt={`product slider button top`}
                className="flex h-[10px] w-[6px] -rotate-90"
              />
            </div>
          </HashLink>
        </div>
      </div>
    </footer>
  );
};
