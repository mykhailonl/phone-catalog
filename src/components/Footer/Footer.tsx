import { HashLink } from 'react-router-hash-link';

import { NavItem } from '../NavItem';
import { Logo } from '../Logo';

export const Footer = () => {
  return (
    <footer className="grid-cols-mobile md:grid-cols-tablet lg:grid-cols-desktop gap-16px px-content md:px-content-md lg:px-content-lg prose md:prose-md lg:prose-lg grid">
      <div className="col-span-full flex flex-col gap-8 py-8">
        <div className="flex w-[89px] items-center">
          <Logo />
        </div>

        {/* TODO change to nav? */}
        <div className="gap-16px flex flex-col">
          <NavItem url="/" name="Github" />

          <NavItem url="/" name="Contacts" />

          <NavItem url="/" name="Rights" />
        </div>

        <div className="gap-16px col-span-full flex items-center justify-center">
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
