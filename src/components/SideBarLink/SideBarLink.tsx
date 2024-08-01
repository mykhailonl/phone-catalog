import { Link } from 'react-router-dom';
import { toggleMenu } from '../../features/sideBar/sideBarSlice';

import styles from './SideBarLink.module.scss';
import { useAppDispatch } from '../../hooks';

type Props = {
  image: string;
  url: string;
  name: 'fav' | 'cart';
  amount?: number;
};

const {
  sideBarLink,
  sideBarLink__iconWrapper,
  sideBarLink__iconImg,
  sideBarLink__amount,
} = styles;

export const SideBarLink = ({ image, url, amount, name }: Props) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(toggleMenu());
  };

  // #region conditions
  const additionalImgStyles = amount ? { height: '28px', width: '28px' } : {};
  const img = amount ? `/icons/${name}-counter.svg` : image;
  const additionalAmountStyles = amount && amount > 9 ? { right: '3px' } : {};
  // #endregion

  return (
    <Link to={url} className={sideBarLink} onClick={handleClick}>
      <div className={sideBarLink__iconWrapper} style={additionalImgStyles}>
        <img src={img} alt="" className={sideBarLink__iconImg} />

        {!!amount && (
          <p className={sideBarLink__amount} style={additionalAmountStyles}>
            {amount}
          </p>
        )}
      </div>
    </Link>
  );
};
