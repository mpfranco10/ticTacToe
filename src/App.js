import './App.css';
import React from 'react';
import Board from './components/Board/Board';

function App() {
  return (
    <div className="App">
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    </div>
  );
}

export default App;
