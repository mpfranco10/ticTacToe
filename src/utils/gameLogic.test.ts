import { createEmptyBoard, getGameState } from "./gameLogic";
import type { Cell } from "./gameLogic";

test.each([
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
])("detects winning line %i, %i, %i", (first, second, third) => {
  const board: Cell[] = createEmptyBoard();
  [first, second, third].forEach((index) => {
    board[index] = "X";
  });
  const result = getGameState(board);
  expect(result.winner).toBe("X");
  expect(result.winningSquares).toEqual([first, second, third]);
  expect(result.isGameOver).toBe(true);
});

test("prioritizes a win over a full-board draw", () => {
  expect(
    getGameState(["X", "O", "X", "O", "X", "O", "X", "O", "X"]),
  ).toMatchObject({ winner: "X", isDraw: false });
});
