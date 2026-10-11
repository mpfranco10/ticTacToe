import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import Square from "../Square/Square";
import { createEmptyBoard, getGameState } from "../../utils/gameLogic";

const Board = () => {
  const [board, setBoard] = useState(createEmptyBoard);
  const squareRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { winner, winningSquares, currentPlayer, isDraw, isGameOver } =
    getGameState(board);
  const drawStatus = isDraw ? "Draw!" : `${currentPlayer}'s turn`;
  const status = winner ? `${winner} wins!` : drawStatus;

  const playMove = (index: number) => {
    setBoard((previousBoard) => {
      if (previousBoard[index] || getGameState(previousBoard).isGameOver)
        return previousBoard;
      const { currentPlayer: player } = getGameState(previousBoard);
      return previousBoard.map((cell, cellIndex) =>
        cellIndex === index ? player : cell,
      );
    });
  };

  const navigateBoard = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const row = Math.floor(index / 3);
    const column = index % 3;
    const destinations: Record<string, number> = {
      ArrowRight: row * 3 + ((column + 1) % 3),
      ArrowLeft: row * 3 + ((column + 2) % 3),
      ArrowDown: ((row + 1) % 3) * 3 + column,
      ArrowUp: ((row + 2) % 3) * 3 + column,
      Home: 0,
      End: 8,
    };
    if (event.key in destinations) {
      event.preventDefault();
      squareRefs.current[destinations[event.key]]?.focus();
    }
  };

  const resetGame = () => {
    setBoard(createEmptyBoard());
    squareRefs.current[0]?.focus();
  };

  const drawLabel = isDraw
    ? "A worthy match. Try another round?"
    : "Get three in a row to win.";
  const statusLabel = winner ? "Three in a row. Nicely played." : drawLabel;

  return (
    <>
      <div className="status-panel">
        <p
          className="game-status"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <span
            className={`status-dot ${winner || currentPlayer}`}
            aria-hidden="true"
          />
          {status}
        </p>
        <p className="status-hint">{statusLabel}</p>
      </div>
      <div
        className="board"
        aria-label="Tic tac toe board"
        aria-describedby="board-instructions"
      >
        {board.map((token, index) => (
          <Square
            key={index}
            token={token}
            index={index}
            unavailable={isGameOver || token !== null}
            isWinning={winningSquares.includes(index)}
            buttonRef={(element) => {
              squareRefs.current[index] = element;
            }}
            onSquareClick={() => playMove(index)}
            onKeyDown={(event) => navigateBoard(event, index)}
          />
        ))}
      </div>
      <button className="reset-button" type="button" onClick={resetGame}>
        New game <span aria-hidden="true">↻</span>
      </button>
      <p className="keyboard-hint" id="board-instructions">
        Tab or arrow keys to explore · Enter or Space to play
      </p>
    </>
  );
};

export default Board;
