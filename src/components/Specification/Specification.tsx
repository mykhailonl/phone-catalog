import styles from './Specification.module.scss';

type Props = {
  label: 'Screen' | 'Capacity' | 'RAM';
  value: string;
};

export const Specification = ({ label, value }: Props) => {
  const { spec, spec__text, 'spec__text--bold': spec__text_bold } = styles;

  return (
    <div className={spec}>
      <small className={spec__text}>{label}</small>

      <small className={`${spec__text} ${spec__text_bold}`}>{value}</small>
    </div>
  );
};
