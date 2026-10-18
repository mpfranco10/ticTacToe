import "./App.css";
import Board from "./components/Board/Board";

const App = () => (
  <main className="app">
    <section className="game" aria-labelledby="game-title">
      <header className="game-header">
        <p className="eyebrow">Two-player game</p>
        <h1 id="game-title">
          Tic <span>tac</span> toe.
        </h1>
        <p>Take turns and get three in a row.</p>
      </header>
      <Board />
    </section>
  </main>
);

export default App;
