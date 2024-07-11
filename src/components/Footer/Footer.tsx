import { HashLink } from 'react-router-hash-link';

import { NavItem } from '../NavItem';
import { Logo } from '../Logo';

import styles from './Footer.module.scss';

export const Footer = () => {
  const {
    footer,
    footer__container,
    footer__logo,
    footer__nav,
    footer__anchor,
    footer__anchor__text,
    footer__anchor__link,
    footer__anchor__icon,
    footer__anchor__arrow,
  } = styles;

  return (
    <footer className={footer}>
      <div className={footer__container}>
        <div className={footer__logo}>
          <Logo />
        </div>

        {/* TODO check hover values (item width) */}
        <nav className={footer__nav}>
          <NavItem url="/" name="Github" />

          <NavItem url="/" name="Contacts" />

          <NavItem url="/" name="Rights" />
        </nav>

        <div className={footer__anchor}>
          <small className={footer__anchor__text}>Back to top</small>

          <HashLink smooth to="#header" className={footer__anchor__link}>
            <div className={footer__anchor__icon}>
              <img
                src={`/icons/right-arrow.svg`}
                alt={`product slider button top`}
                className={footer__anchor__arrow}
              />
            </div>
          </HashLink>
        </div>
      </div>
    </footer>
  );
};
