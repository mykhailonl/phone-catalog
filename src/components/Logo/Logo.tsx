import { Link } from 'react-router-dom';

import styles from './Logo.module.scss';

export const Logo = () => {
  return (
    <Link to="/" className={styles.logo}>
      <img
        src="logo/logo-3x.png"
        alt="nice gadgets logo"
        className={styles.logo__img}
      />
    </Link>
  );
};
