export type Player = "X" | "O";
export type Cell = Player | null;

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const createEmptyBoard = (): Cell[] => Array(9).fill(null);

export const getGameState = (board: Cell[]) => {
  const winningLines = WINNING_LINES.filter(
    ([first, second, third]) =>
      board[first] !== null &&
      board[first] === board[second] &&
      board[first] === board[third],
  );
  const winner = winningLines.length ? board[winningLines[0][0]] : null;
  const moveCount = board.filter(Boolean).length;
  const currentPlayer: Player = moveCount % 2 === 0 ? "X" : "O";
  const isDraw = !winner && moveCount === 9;

  return {
    winner,
    winningSquares: winningLines.flat(),
    currentPlayer,
    isDraw,
    isGameOver: Boolean(winner) || isDraw,
  };
};
