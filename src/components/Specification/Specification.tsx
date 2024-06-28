type Props = {
  label: 'Screen' | 'Capacity' | 'RAM';
  value: string;
};

export const Specification = ({ label, value }: Props) => {
  return (
    <div className="flex justify-between">
      <small className="text-secondary m-0">{label}</small>

      <small className="font-bold">{value}</small>
    </div>
  );
};
