import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

const getSquares = () =>
  screen.getAllByRole("button", { name: /^Row [1-3], column [1-3]:/ });
const play = (moves) =>
  moves.forEach((index) => userEvent.click(getSquares()[index]));

test("alternates turns and prevents overwriting occupied squares", () => {
  render(<App />);
  expect(screen.getByRole("status")).toHaveTextContent("X's turn");
  play([0, 0]);
  expect(getSquares()[0]).toHaveAccessibleName("Row 1, column 1: X");
  expect(getSquares()[0]).toHaveAttribute("aria-disabled", "true");
  expect(screen.getByRole("status")).toHaveTextContent("O's turn");
  play([1]);
  expect(getSquares()[1]).toHaveTextContent("O");
  expect(screen.getByRole("status")).toHaveTextContent("X's turn");
});

test.each([
  ["X", [0, 3, 1, 4, 2]],
  ["O", [0, 3, 1, 4, 8, 5]],
])(
  "%s wins, highlights the line, and prevents further moves",
  (winner, moves) => {
    render(<App />);
    play(moves);
    expect(screen.getByRole("status")).toHaveTextContent(`${winner} wins!`);
    expect(
      getSquares().filter((square) =>
        square.classList.contains("square-winning"),
      ),
    ).toHaveLength(3);
    play([6]);
    expect(getSquares()[6]).toHaveTextContent("");
    getSquares().forEach((square) =>
      expect(square).toHaveAttribute("aria-disabled", "true"),
    );
  },
);

test("detects a draw and starts a fresh game", () => {
  render(<App />);
  play([0, 1, 2, 4, 3, 5, 7, 6, 8]);
  expect(screen.getByRole("status")).toHaveTextContent("Draw!");
  userEvent.click(screen.getByRole("button", { name: /new game/i }));
  expect(screen.getByRole("status")).toHaveTextContent("X's turn");
  getSquares().forEach((square) => expect(square).toHaveTextContent(""));
  expect(getSquares()[0]).toHaveFocus();
});

test("supports tab, arrows, Enter and Space, including inspection of occupied cells", () => {
  render(<App />);
  userEvent.tab();
  expect(getSquares()[0]).toHaveFocus();
  userEvent.keyboard("{Enter}");
  expect(getSquares()[0]).toHaveTextContent("X");
  fireEvent.keyDown(getSquares()[0], { key: "ArrowRight" });
  expect(getSquares()[1]).toHaveFocus();
  userEvent.keyboard(" ");
  expect(getSquares()[1]).toHaveTextContent("O");
  fireEvent.keyDown(getSquares()[1], { key: "ArrowDown" });
  expect(getSquares()[4]).toHaveFocus();
  fireEvent.keyDown(getSquares()[4], { key: "Home" });
  expect(getSquares()[0]).toHaveFocus();
  userEvent.keyboard("{Enter}");
  expect(screen.getByRole("status")).toHaveTextContent("X's turn");
  fireEvent.keyDown(getSquares()[0], { key: "ArrowLeft" });
  expect(getSquares()[2]).toHaveFocus();
  fireEvent.keyDown(getSquares()[2], { key: "ArrowUp" });
  expect(getSquares()[8]).toHaveFocus();
});
