import { Link } from 'react-router-dom';

type Props = {
  image: string;
  url: string;
};

export const SideBarLink = ({ image, url }: Props) => {
  return (
    <Link
      to={url}
      className="flex h-full w-full flex-grow items-center justify-center shadow-custom-left"
    >
      <div className="h-4 w-4">
        <img src={image} alt="" className="m-0 h-full w-full" />
      </div>
    </Link>
  );
};

// TODO check shadow options
