import { setScrollToTop } from '../../features/scroll/scrollSlice';
import { NavItem } from '../NavItem';
import { Logo } from '../Logo';

import styles from './Footer.module.scss';
import { useAppDispatch } from '../../hooks';

// TODO switch from NavLink to links?
// TODO add correct links
export const Footer = () => {
  const dispatch = useAppDispatch();
  const {
    footer,
    footer__content,
    footer__logo,
    footer__nav,
    footer__anchor,
    footer__anchor__text,
    footer__anchor__link,
    footer__anchor__icon,
  } = styles;

  const handleAnchorClick = () => {
    dispatch(setScrollToTop('smooth'));
  };

  return (
    <footer className={footer}>
      <div className={footer__content}>
        <div className={footer__logo}>
          <Logo placement="footer" />
        </div>

        {/* TODO check hover values (item width) */}
        <nav className={footer__nav}>
          <NavItem url="github.com/mykhailonl" name="Github" />

          <NavItem url="/" name="Contacts" />

          <NavItem url="/" name="Rights" />
        </nav>

        <div className={footer__anchor}>
          <small className={footer__anchor__text}>Back to top</small>

          <button className={footer__anchor__link} onClick={handleAnchorClick}>
            <div className={footer__anchor__icon} />
          </button>
        </div>
      </div>
    </footer>
  );
};
