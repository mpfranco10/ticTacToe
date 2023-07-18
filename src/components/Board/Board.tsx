import React, { useState } from 'react';
import Square from '../Square/Square';
import { checkForWinner, getNextTurn } from './BoardUtilities';
import Label from '../Label';

const rowStyle = {
  display: 'flex'
};

const boardStyle = {
  width: '300px',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'grid'
};

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  height: '100%'
} as React.CSSProperties;

const buttonStyle = {
  marginTop: '15px',
  marginBottom: '16px'
};

export default function Board() {
  const [board, setBoard] = useState<string[][]>([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]);
  const [turn, setTurn] = useState<string>('X');
  const [winner, setWinner] = useState<string | null>(null);

  const updateBoard = (i: number, j: number) => {
    const newBoard = [...board];
    newBoard[i][j] = turn;
    setBoard(newBoard);
    const potentialWinner = checkForWinner(newBoard, turn, i, j);
    if (potentialWinner) {
      setWinner(potentialWinner);
    } else {
      setTurn(getNextTurn(turn));
    }
  };

  const resetBoard = () => {
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]);
    setTurn('X');
    setWinner(null);
  };

  return (
    <div style={containerStyle}>
      <Label label="Next player:">
        <span
          className={'token '.concat(turn === 'O' ? 'pinkToken' : 'blueToken')}
          style={{ marginLeft: '10px' }}
        >
          {turn}
        </span>
      </Label>

      <Label label="Winner:">
        {winner !== null ? (
          <span
            className={'token '.concat(
              winner === 'O' ? 'pinkToken' : 'blueToken'
            )}
            style={{ marginLeft: '10px' }}
          >
            {winner}
          </span>
        ) : (
          <span style={{ marginLeft: '10px' }}>None</span>
        )}
      </Label>

      <button style={buttonStyle} onClick={resetBoard}>
        Reset
      </button>
      <div style={boardStyle}>
        {board.map((row, i) => (
          <div className="board-row" style={rowStyle} key={i}>
            {row.map((currentToken, j) => (
              <Square
                key={i + '' + j}
                i={i}
                j={j}
                disabled={winner != null || currentToken !== ''}
                token={currentToken}
                onSquareClick={updateBoard}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
