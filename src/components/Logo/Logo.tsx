import { Link } from 'react-router-dom';

import logo from '../../img/logo/logo.svg';

// TODO check what to do with hand size
// TODO text color

export const Logo = () => {
  return (
    <Link to="/" className="relative h-[22px] w-16">
      <img src={logo} alt="nice gadgets logo" />
      <span
        className="absolute right-[22px] top-[-3px]"
        style={{ fontSize: '12px' }}
      >
        👌
      </span>
    </Link>
  );
};
