// TODO check img height
// TODO check if it nextButton gets disabled after offset fix
import styles from './ProductSliderButton.module.scss';

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
  const { button, button__disabled, button__imgWrapper, button__img } = styles;

  return (
    <button
      className={`${button} ${disabled ? button__disabled : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className={button__imgWrapper}>
        <img
          src={`/icons/${direction}-arrow.svg`}
          alt={`product slider button ${direction}`}
          className={button__img}
        />
      </div>
    </button>
  );
};
