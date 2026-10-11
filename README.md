# Tic Tac Toe

A playful, two-player Tic Tac Toe game built with React and TypeScript. A small front-end portfolio project focused on clear game logic, accessible interactions, and responsive design.

**[Play the live game](https://mpfranco10.github.io/ticTacToe)**

## Features

- Local two-player gameplay: X goes first, then players alternate turns.
- Clear turn, win, and draw messages, with winning squares highlighted.
- New Game action to reset the board and return focus to the first square.
- Responsive navy interface with light-blue Xs, pink Os, and rounded squares.
- Keyboard controls, visible focus indicators, and screen-reader status announcements.
- Subtle animations that respect `prefers-reduced-motion`.

## Tech stack

React 18, TypeScript 6, and Vite 8. ESLint checks JavaScript, TypeScript, and React Hooks. Vitest, Testing Library, and jsdom provide gameplay tests. Styling uses plain CSS; game state uses React hooks.

## Getting started

Use Node.js **22.13+ within 22.x**, **24.x**, or **26+**, with npm. If you use nvm, `.nvmrc` selects Node 22:

```sh
nvm install
nvm use
```

From the project directory, install the locked dependencies and start the development server:

```sh
npm ci
npm run dev
```

Open the URL printed by Vite, normally [localhost:5173/ticTacToe/](http://localhost:5173/ticTacToe/). `npm start` also starts the development server.

## How to play

Take turns selecting empty squares on the same device. The first player to fill a row, column, or diagonal wins. A full board without a winner is a draw. Select **New game** to play again.

| Key             | Action                                                    |
| --------------- | --------------------------------------------------------- |
| Tab / Shift+Tab | Move between squares and the New Game button              |
| Arrow keys      | Move around the board, wrapping within each row or column |
| Home / End      | Focus the first or last square                            |
| Enter / Space   | Play in the focused empty square or activate New Game     |

Occupied squares and squares in a finished game remain focusable for inspection, but cannot accept moves.

## Commands

| Command                      | Purpose                                                 |
| ---------------------------- | ------------------------------------------------------- |
| `npm run dev` or `npm start` | Start Vite with hot reload                              |
| `npm run typecheck`          | Run TypeScript without emitting files                   |
| `npm run lint`               | Run ESLint with zero warnings allowed                   |
| `npm test`                   | Run the test suite once                                 |
| `npm run test:watch`         | Run tests in watch mode                                 |
| `npm run build`              | Type-check and generate the production build in `dist/` |
| `npm run preview`            | Serve the production build locally                      |
| `npm run deploy`             | Build and publish `dist/` to GitHub Pages               |

To check the production build locally:

```sh
npm run build
npm run preview
```

Open the preview URL printed by Vite, normally [localhost:4173/ticTacToe/](http://localhost:4173/ticTacToe/).

## Project structure

```text
index.html                 Vite HTML entry
vite.config.ts             React plugin, base path, and test configuration
eslint.config.js           ESLint flat configuration
src/
  main.jsx                 React entry point
  App.jsx                  Page layout and game card
  App.css                  Global styles and responsive layout
  App.test.jsx             Gameplay and keyboard interaction tests
  components/
    Board/Board.tsx        Board state, status, and keyboard navigation
    Square/Square.tsx      Accessible square button
    Square/square.css      Square styling and marker animation
  utils/
    gameLogic.ts           Pure game-state helpers
    gameLogic.test.ts      Winning-line and game-over tests
  setupTests.js            Test matchers and cleanup
public/                    Static icons, manifest, and robots.txt
```

The board is the single source of game state. Current player, winner, winning squares, draw, and game-over status are derived from it. Moves update the board immutably. Game rules are separate from rendering, while the component structure stays small.

TypeScript retains `strict: true` and uses bundler module resolution. Tests cover alternating turns, occupied squares, X/O wins, every winning line, draws, reset, and keyboard interaction.

The X/O lettering uses Permanent Marker from Google Fonts, with a cursive fallback when the font is unavailable.

## GitHub Pages deployment

The public URL remains **https://mpfranco10.github.io/ticTacToe**.

Vite's `base` is `/ticTacToe/` so scripts, styles, and public assets resolve under the repository path. The `homepage` field in `package.json` records the public URL; Vite uses the base path in `vite.config.ts`.

With push access to the repository, run:

```sh
npm run deploy
```

The `predeploy` script runs the production build first. The `gh-pages` CLI then publishes the contents of `dist/` to the existing `gh-pages` branch. GitHub Pages should continue serving from that branch's root; this workflow does not require GitHub Actions.
