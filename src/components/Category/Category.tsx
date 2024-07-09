import { Link } from 'react-router-dom';

type Props = {
  photo: string;
  name: 'Mobile phones' | 'Tablets' | 'Accessories';
  quantity: number;
  bgColor: string;
};

// TODO move img, add bg and position
export const Category = ({ photo, name, quantity, bgColor }: Props) => {
  return (
    <div className="col-span-full flex flex-col gap-6 md:col-span-4">
      <Link className="flex h-72 w-72 md:h-[187px] md:w-[187px]" to="#">
        <div className={`${bgColor} relative h-full w-full overflow-hidden`}>
          <img
            src={photo}
            alt={`${name} category`}
            className="absolute left-0 top-0 m-0 h-full w-auto translate-x-[40%] transform md:top-5"
          />
        </div>
      </Link>

      <div className="flex flex-col gap-1">
        {/* TODO params on other screen */}
        <h3 className="m-0 text-gray-primary">{name}</h3>

        <p className="m-0 text-secondary">{quantity} models</p>
      </div>
    </div>
  );
};
