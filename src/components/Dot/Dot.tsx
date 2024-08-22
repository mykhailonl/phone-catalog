import React from 'react';
import styles from './Dot.module.scss';

interface DotProps {
  isActive: boolean;
  onClick: () => void;
}

export const Dot: React.FC<DotProps> = React.memo(({ isActive, onClick }) => {
  const { dot, dot__content, dot__isActive } = styles;

  return (
    <button className={dot} onClick={onClick}>
      <div
        className={`${dot__content} ${isActive ? dot__isActive : 'bg-elements'}`}
      />
    </button>
  );
});

Dot.displayName = 'Dot';
