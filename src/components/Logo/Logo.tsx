import { Link } from 'react-router-dom';

import styles from './Logo.module.scss';

type Props = {
  placement: 'header' | 'footer';
};

export const Logo = ({ placement }: Props) => {
  return (
    <Link
      to="/"
      className={styles.logo}
      style={
        placement === 'header'
          ? { width: '64px', height: '22px' }
          : { width: '89px', height: '32px' }
      }
    >
      <img
        src="/logo/logo-3x.png"
        alt="nice gadgets logo"
        className={styles.logo__img}
      />
    </Link>
  );
};
