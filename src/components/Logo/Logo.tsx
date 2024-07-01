import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link to="/" className="h-full w-full">
      <img
        src="logo/logo-3x.png"
        alt="nice gadgets logo"
        className="m-0 h-full w-full"
      />
    </Link>
  );
};
