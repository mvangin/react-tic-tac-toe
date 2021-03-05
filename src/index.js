import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
        return (
            <button className="square" onClick={() =>
                this.props.onClick()}>

                {this.props.value}

            </button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameboard: Array(9).fill(null),
            isX: true
        };
    }
    
    handleClick(i) {
        
        let gameboard = this.state.gameboard.slice();

        if (this.state.gameboard[i] === null) {
            if (this.state.isX) {
                gameboard[i] = 'X';
                this.setState({ isX: !this.state.isX })
            } else {
                gameboard[i] = '0'
                this.setState({ isX: !this.state.isX })
            }
            this.setState({ gameboard: gameboard })
        } 

        let winner = this.determineWinner(gameboard);
        if (winner){
            alert(`${winner} is the winner!`)
        }

    }

    determineWinner(gameboard) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (gameboard[a] && gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c]) {
            return gameboard[a];
          }
        }
        return null;
      }


    renderSquare(i) {
        return <Square onClick={() => this.handleClick(i)} index={i} value={this.state.gameboard[i]} />;
    }

    render() {
        let turn = this.state.isX ? "0" : "X";
        const status = `Next player: ${turn}`;

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{ }</div>
                    <ol>{ }</ol>
                </div>
            </div>
        );
    }
}



ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
