import { useState } from 'react';
import './App.css'


interface SquareProps {
  value: string | null,
  onSquareClick: React.MouseEventHandler<HTMLButtonElement>
}

function Square({ value, onSquareClick }: SquareProps) {
  return <button className="square" onClick={onSquareClick} >{value}</button>;
}

interface BoardProps {
  xIsNext: boolean,
  squares: (string | null)[]
  onPlay: (t: (string | null)[]) => void
}

function Board({ xIsNext, squares, onPlay }: BoardProps) {
  function handleClick(i: number) {
    if (squares[i] || checkWinner(squares)) return
    const nextSquare = [...squares]
    nextSquare[i] = xIsNext ? 'X' : 'O'
    onPlay(nextSquare)
  }
  const winner = checkWinner(squares)
  const status = winner ? 'winner is :' + winner : 'next Player :' + (xIsNext ? 'x' : 'O')


  return (
    <>
      <h1>{status}</h1>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState<(string | null)[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquare = history[currentMove]

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move
    }
    else {
      description = 'Go to game start'
    }
    return <li key={move}>
      <button onClick={() => jumpTo(move)}>{description}</button>
    </li>
  })

  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquare} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function checkWinner(squares: (string | null)[]) {

  const winningSquare = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

  for (const [a, b, c] of winningSquare) {
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a]
    }
  }
  return null
}
