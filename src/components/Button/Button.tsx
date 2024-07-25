import { CSSProperties } from 'react';
import styles from './Button.module.scss';
const { button, button__img, button__disabled } = styles;

type Props = {
  bgImg: string;
  action: () => void;
  disabled: boolean;
  additionalStyles?: CSSProperties;
};

export const Button = ({
  bgImg,
  action,
  disabled,
  additionalStyles,
}: Props) => {
  return (
    <button
      className={`${button} ${disabled ? button__disabled : ''}`}
      onClick={action}
      style={additionalStyles}
      disabled={disabled}
    >
      <img src={bgImg} alt="" className={button__img} />
    </button>
  );
};
