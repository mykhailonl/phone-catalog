type Props = {
  label: 'Screen' | 'Capacity' | 'RAM';
  value: string;
};

export const Specification = ({ label, value }: Props) => {
  return (
    <div className="flex justify-between">
      <small className="m-0 text-secondary">{label}</small>

      <small className="font-bold">{value}</small>
    </div>
  );
};
