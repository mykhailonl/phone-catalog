import { Link, useLocation } from 'react-router-dom';
import { toggleMenu } from '../../features/sideBar/sideBarSlice';

import { useAppDispatch } from '../../hooks';

import styles from './SecondaryNavLink.module.scss';
const {
  secondaryNavLink,
  secondaryNavLink__iconWrapper,
  secondaryNavLink__iconImg,
  secondaryNavLink__amount,
} = styles;

type SideBarLinkProps = {
  image: string;
  url: string;
  name: 'favourites' | 'cart';
  amount?: number;
};

export const SecondaryNavLink = ({
  image,
  url,
  amount,
  name,
}: SideBarLinkProps) => {
  const pathname = useLocation().pathname;
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(toggleMenu());
  };

  // #region conditions
  const img = amount ? `/icons/${name}-counter.svg` : image;
  const locatedInCategory = pathname.includes(name);
  // #endregion

  return (
    <Link
      to={url}
      className={`
        ${secondaryNavLink} 
        ${locatedInCategory && styles['secondaryNavLink--isActive']}
      `}
      onClick={handleClick}
    >
      <div
        className={`
        ${secondaryNavLink__iconWrapper} 
        ${amount && styles['secondaryNavLink__iconWrapper--hasAmount']}
      `}
      >
        <img
          src={img}
          alt={`${name} icon link`}
          className={secondaryNavLink__iconImg}
        />

        {!!amount && (
          <p
            className={`
            ${secondaryNavLink__amount} 
            ${amount > 9 && styles['secondaryNavLink__amount--hasAmount']}
          `}
          >
            {amount}
          </p>
        )}
      </div>
    </Link>
  );
};
