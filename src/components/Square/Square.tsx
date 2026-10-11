import type { KeyboardEventHandler, Ref } from "react";
import type { Cell } from "../../utils/gameLogic";
import "./square.css";

type SquareProps = {
  token: Cell;
  index: number;
  unavailable: boolean;
  isWinning: boolean;
  buttonRef: Ref<HTMLButtonElement>;
  onSquareClick: () => void;
  onKeyDown: KeyboardEventHandler<HTMLButtonElement>;
};

const Square = ({
  token,
  index,
  unavailable,
  isWinning,
  buttonRef,
  onSquareClick,
  onKeyDown,
}: SquareProps) => {
  const buttonClassName = `square${isWinning ? " square-winning" : ""}${
    token ? ` square-${token}` : ""
  }`;

  return (
    <button
      ref={buttonRef}
      type="button"
      className={buttonClassName}
      aria-label={`Row ${Math.floor(index / 3) + 1}, column ${
        (index % 3) + 1
      }: ${token || "empty"}${isWinning ? ", winning square" : ""}`}
      aria-disabled={unavailable}
      onClick={() => {
        if (!unavailable) onSquareClick();
      }}
      onKeyDown={onKeyDown}
    >
      {token && (
        <span className={`token token-${token}`} aria-hidden="true">
          {token}
        </span>
      )}
    </button>
  );
};

export default Square;
