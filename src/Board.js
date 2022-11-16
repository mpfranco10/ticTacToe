import React, { useState } from 'react';
import Square from './Square';

const rowStyle = {
    display: 'flex'
}

const boardStyle = {
    'backgroundColor': '#eee',
    'width': '208px',
    'alignItems': 'center',
    'justifyContent': 'center',
    'display': 'flex',
    'flexDirection': 'column',
    'border': '3px #eee solid'
}

const containerStyle = {
    'display': 'flex',
    'alignItems': 'center',
    'flexDirection': 'column'
}

const instructionsStyle = {
    'marginTop': '5px',
    'marginBottom': '5px',
    'fontWeight': 'bold',
    'fontSize': '16px',
}

const buttonStyle = {
    'marginTop': '15px',
    'marginBottom': '16px',
    'width': '80px',
    'height': '40px',
    'backgroundColor': '#8acaca',
    'color': 'white',
    'fontSize': '16px',
}

export default function Board() {
    const [boardState, setBoardState] = useState({
        turn: 'X',
        board: [['', '', ''], ['', '', ''], ['', '', '']],
        winner: null,
        reset: false,
    });

    const checkRow = (myBoard, token, i, j) => {
        let full = true;
        let row = myBoard[i];
        for (let t in row) {
            full = full && row[t] === token;
        }
        return full;
    };

    const checkColumn = (myBoard, token, i, j) => {
        let full = true;
        let row = myBoard[i];
        for (let t in row) {
            full = full && myBoard[t][j] === token;
        }
        return full;
    };

    const checkUpToDownDiagonal = (myBoard, token, i, j) => {
        let t1 = myBoard[0][0];
        let t2 = myBoard[1][1];
        let t3 = myBoard[2][2];
        let ans = t1 === token && t1 === t2 && t1 === t3;
        return ans;
    };

    const checkDownToUpDiagonal = (myBoard, token, i, j) => {
        let t1 = myBoard[2][0];
        let t2 = myBoard[1][1];
        let t3 = myBoard[0][2];
        let ans = t1 === token && t1 === t2 && t1 === t3;
        return ans;
    };

    const shouldCheckDownToUpDiagonal = (myBoard, token, i, j) => {
        let c1 = i === 2 && j === 0;
        let c2 = i === 1 && j === 1;
        let c3 = i === 0 && j === 2;
        return c1 || c2 || c3;
    };

    const checkForWinner = (myBoard, token, i, j) => {
        let winner = null;
        if (checkRow(myBoard, token, i, j)) {
            return token;
        }
        if (checkColumn(myBoard, token, i, j)) {
            return token;
        }
        if (i === j && checkUpToDownDiagonal(myBoard, token, i, j)) {
            return token;
        }
        if (shouldCheckDownToUpDiagonal && checkDownToUpDiagonal(myBoard, token, i, j)) {
            return token;
        }
        return winner;
    };

    const updateBoard = (squareState) => {
        let newTurn = squareState.token === 'X' ? 'O' : 'X';
        setBoardState((prevState) => {
            let newBoard = [...prevState.board];
            newBoard[squareState.i][squareState.j] = squareState.token; //paint new board

            //next check for winner
            let winner = checkForWinner(newBoard, squareState.token, squareState.i, squareState.j);
            if (winner == null) {
                let newState = { turn: newTurn, board: newBoard, winner: null };
                return newState;
            } else {
                let newState = { turn: squareState.token, board: newBoard, winner: squareState.token };
                return newState;
            }
        });
    };

    const resetBoard = () => {
        setBoardState({
            turn: 'X',
            board: [['', '', ''], ['', '', ''], ['', '', '']],
            winner: null,
            reset: true
        });
    }

    return (
        <div style={containerStyle} className="gameBoard">
            <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{boardState.turn}</span></div>
            <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{boardState.winner != null ? boardState.winner : 'None'}</span></div>
            <button style={buttonStyle} onClick={resetBoard} >Reset</button>
            <div style={boardStyle}>
                {boardState.board.map((miniArray, i) =>
                    <div className="board-row" style={rowStyle} key={i}>
                        {miniArray.map((element, j) =>
                            <Square
                                key={i + '' + j}
                                i={i}
                                j={j}
                                disable={boardState.winner != null}
                                turn={boardState.turn}
                                updateBoard={updateBoard}
                                reset={boardState.reset} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}