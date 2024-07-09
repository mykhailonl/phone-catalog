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
    <div className="prose flex h-[439px] w-[75%] flex-shrink-0 flex-col gap-2 border-[1px] border-elements p-8 md:prose-md lg:prose-lg md:h-[512px] md:w-5/12">
      <div className="flex max-h-[129px] md:max-h-[202px]">
        <img
          src={product.image}
          alt={`${product.image} photo`}
          className="m-0 h-full w-full object-contain"
        />
      </div>

      <Link to={product.itemId} className="pt-4">
        <button className="text-left text-gray-primary">{product.name}</button>
      </Link>

      <div className="flex items-center gap-2">
        {!discount ? (
          <h2 className="m-0 text-gray-primary">${product.fullPrice}</h2>
        ) : (
          <>
            <h2 className="m-0 text-gray-primary">${product.price}</h2>

            <h3 className="m-0 text-secondary line-through">
              ${product.fullPrice}
            </h3>
          </>
        )}
      </div>

      <div className="h-[1px] bg-elements"></div>

      <div className="flex flex-col gap-2 py-2">
        <Specification label="Screen" value={product.screen} />

        <Specification label="Capacity" value={product.capacity} />

        <Specification label="RAM" value={product.ram} />
      </div>

      <div className="flex justify-between gap-2">
        <button className="flex-grow bg-gray-primary p-[9.5px] text-white">
          Add to cart
        </button>

        <button className="h-10 w-10 border-[1px] border-elements p-3">
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
