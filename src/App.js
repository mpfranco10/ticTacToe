import './App.css';
import React from 'react';
import Board from './Board';

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
