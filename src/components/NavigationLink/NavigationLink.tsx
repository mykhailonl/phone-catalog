import { NavigationLinkType } from '../../types/NavigationLinkType';

import styles from './NavigationLink.module.scss';
import { Link } from 'react-router-dom';

export const NavigationLink = ({ url, name }: NavigationLinkType) => {
  return (
    <Link to={url} className={styles.navigationLink}>
      <span className={styles.navigationLink__name}>{name}</span>
    </Link>
  );
};
