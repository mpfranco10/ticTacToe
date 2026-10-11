import "./App.css";
import Board from "./components/Board/Board";

const App = () => (
  <main className="app">
    <section className="game" aria-labelledby="game-title">
      <header className="game-header">
        <p className="eyebrow">A little friendly competition</p>
        <h1 id="game-title">
          Tic <span>tac</span> toe.
        </h1>
        <p>Two players. Nine squares. Your move.</p>
      </header>
      <Board />
      <footer className="game-footer">
        Made for two · Play on the same device
      </footer>
    </section>
  </main>
);

export default App;
