// TODO check img height
// TODO check if it nextButton gets disabled after offset fix

type Props = {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled: boolean;
};

export const ProductSliderButton = ({
  direction,
  onClick,
  disabled,
}: Props) => {
  return (
    <button
      className={`flex h-8 w-8 items-center justify-center border-[1px] ${disabled ? 'border-elements opacity-50' : 'border-icons'}`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex h-4 w-4 items-center justify-center">
        <img
          src={`/icons/${direction}-arrow.svg`}
          alt={`product slider button ${direction}`}
          className="flex h-[10px] w-[6px]"
        />
      </div>
    </button>
  );
};
