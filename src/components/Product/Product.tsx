import { Product as ProductType } from '../../types/Product';
import { Specification } from '../Specification';

type Props = {
  product: ProductType;
  discount: boolean;
};

// TODO
// solution for offset

export const Product = ({ product, discount }: Props) => {
  return (
    <div className="border-elements prose col-span-3 box-border items-center justify-center border-[1px] p-8">
      <div className="flex w-[148px] flex-col gap-2">
        <div className="flex h-[129px] w-full justify-center">
          <img
            src={`${product.image}`}
            alt={`${product.name}`}
            className="m-0 flex h-full w-full object-contain"
          />
        </div>

        {/* TODO switch to Link prob? but keep the styles */}
        <button className="text-gray-primary pt-4 text-start">
          {product.name}
        </button>

        <div className="flex items-center gap-2">
          <h2 className="text-gray-primary m-0">{`$${product.price}`}</h2>

          {discount && (
            <h3 className="text-secondary m-0 line-through">{`$${product.fullPrice}`}</h3>
          )}
        </div>

        <div className="bg-elements h-[1px]"></div>

        <div className="flex flex-col gap-2 py-2">
          <Specification label="Screen" value={product.screen} />

          <Specification label="Capacity" value={product.capacity} />

          <Specification label="RAM" value={product.ram} />
        </div>

        <div className="flex justify-between gap-2">
          <button className="bg-gray-primary p-[9.5px] text-center text-white">
            Add to cart
          </button>

          <button className="border-icons flex h-10 w-10 items-center justify-center border-[1px]">
            {/* TODO add conditional rendering for heart */}
            <div className="flex items-center justify-center">
              <img
                src="/icons/emty-heart.svg"
                alt="emty heart"
                className="m-0 h-4 w-4"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
