import React, { useState, useEffect } from 'react';

const squareStyle = {
    'width': '60px',
    'height': '60px',
    'backgroundColor': '#ddd',
    'margin': '4px',
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'fontSize': '20px',
    'color': 'white'
}

const tokenStyle = {
    'fontWeight': 'bold',
}

export default function Square(props) {
    const [state, setState] = useState({
        token: '',
        i: props.i,
        j: props.j,
    });

    useEffect(() => {
        let reset = props.reset;
        if (reset) {
            setState((prevState) => {
                return {
                    ...prevState, token: ''
                };
            });
        }

    }, [props.reset]);

    useEffect(() => {
        if (state.token !== '') {
            props.updateBoard(state);
        }
    }, [state.token]);

    const updateSquare = () => {
        setState(prevState => {
            let newState = { ...prevState, token: props.turn };
            return newState;
        });
    };

    return (
        <div
            className="square"
            style={squareStyle}
            onClick={props.disable || state.token !== '' ? () => { } : updateSquare}>
            <p style={{ ...tokenStyle, 'color': state.token === 'X' ? 'red' : 'blue' }}>{state.token}</p>
        </div>
    );
}