import { Link } from 'react-router-dom';
import { Product as ProductType } from '../../types/Product';
import { Specification } from '../Specification';

type Props = {
  product: ProductType;
  discount: boolean;
};

// TODO
// solution for offset className="w-full flex-shrink-0 md:w-[calc(100%/3)]"

export const Product = ({ product, discount }: Props) => {
  return (
    <div className="border-elements prose md:prose-md lg:prose-lg flex h-[439px] w-[75%] flex-shrink-0 flex-col gap-2 border-[1px] p-8">
      <div className="flex max-h-[129px]">
        <img
          src={product.image}
          alt={`${product.image} photo`}
          className="m-0 h-full w-full object-contain"
        />
      </div>

      <Link to={product.itemId} className="mt-4">
        <button className="text-gray-primary text-left">{product.name}</button>
      </Link>

      <div className="flex items-center gap-2">
        {!discount ? (
          <h2 className="text-gray-primary m-0">${product.fullPrice}</h2>
        ) : (
          <>
            <h2 className="text-gray-primary m-0">${product.price}</h2>

            <h3 className="text-secondary m-0 line-through">
              ${product.fullPrice}
            </h3>
          </>
        )}
      </div>

      <div className="bg-elements h-[1px]"></div>

      <div className="flex h-[77px] flex-col justify-evenly">
        <Specification label="Screen" value={product.screen} />

        <Specification label="Capacity" value={product.capacity} />

        <Specification label="RAM" value={product.ram} />
      </div>

      <div className="flex justify-between">
        <button className="bg-gray-primary p-[9.5px] text-white">
          Add to cart
        </button>

        <button className="border-elements h-10 w-10 border-[1px] p-3">
          <img
            src="icons/emty-heart.svg"
            alt=""
            className="m-0 h-full w-full"
          />
        </button>
      </div>
    </div>
  );
};
