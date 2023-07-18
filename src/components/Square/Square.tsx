import React from 'react';
import './Square.css';

type SquareProps = {
  token: string;
  disabled: boolean;
  onSquareClick: (i: number, j: number) => void;
  i: number;
  j: number;
};

export default function Square({
  token,
  disabled,
  onSquareClick,
  i,
  j
}: SquareProps) {
  const handleClick = () => {
    if (!disabled) {
      onSquareClick(i, j);
    }
  };
  return (
    <div
      className={disabled ? 'square squareDisabled' : 'square'}
      onClick={handleClick}
    >
      <h1
        className={'token '.concat(token === 'O' ? 'pinkToken' : 'blueToken')}
      >
        {token}
      </h1>
    </div>
  );
}
