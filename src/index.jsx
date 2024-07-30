import React, { useState } from 'react';
import './styles.css';
import Board from './Board';
import Modal from './Modal';

export default function Tic_tac_toe() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [XIsNext, setXIsNext] = useState(true);
    const [xScore, setXScore] = useState(0);
    const [oScore, setOScore] = useState(0);
    const [status, setStatus] = useState('Current chance X');
    const [modalMessage, setModalMessage] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    
    const calcWinner = (squares) => {
        const potential_winner_lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < potential_winner_lines.length; i++) {
            const [a, b, c] = potential_winner_lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const handleClick = (index) => {
        const newSquares = squares.slice();
        if (newSquares[index] || calcWinner(squares)) {
            return;
        }
        newSquares[index] = XIsNext ? 'X' : 'O';
        setSquares(newSquares);
        setXIsNext(!XIsNext);

        const winner = calcWinner(newSquares);
        if (winner) {
            setModalMessage(`Winner: ${winner}`);
            setModalVisible(true);
            if (winner === 'X') setXScore(xScore + 1);
            else setOScore(oScore + 1);
            setTimeout(() => {
                resetBoard();
                setModalVisible(false);
            }, 2000);
        } else if (!newSquares.includes(null)) {
            setModalMessage('Draw');
            setModalVisible(true);
            setTimeout(() => {
                resetBoard();
                setModalVisible(false);
            }, 2000);
        } else {
            setStatus(`Current chance: ${XIsNext ? 'O' : 'X'}`);
        }
    };

    const resetBoard = () => {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
        setStatus('Current chance X');
    };

    const handleResetClick = () => {
        resetBoard();
        setModalMessage('Game progress has been reset');
            setModalVisible(true);
            setTimeout(() => {
                resetBoard();
                setModalVisible(false);
            }, 2000);
        setOScore(0);
        setXScore(0);
    };

    return (
        <div className="tic-tac-toe-container">
      <div className={`game-content ${isModalVisible ? 'blur' : ''}`}>
        <div className="tic-tac-toe-current-status">
          {status}
        </div>
        <Board squares={squares} onClick={handleClick} />
        <div className="score-board">
          <div>X Score: {xScore}</div>
          <div>O Score: {oScore}</div>
        </div>
        <button className="reset-button" onClick={handleResetClick}>Reset Game</button>
      </div>
      {isModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={() => setModalVisible(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
    );
}
