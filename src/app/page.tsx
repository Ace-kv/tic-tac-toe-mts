'use client'
import { useState } from "react";

function Square({ value, onSquareClick }: {value: string, onSquareClick: () => void}) {

  return (
    <button 
      className="square"
      onClick={onSquareClick}
      >
      { value }
    </button>
  )
}

function Board({ xIsNext, squares, onPlay}: {
  xIsNext: boolean, 
  squares: string[], 
  onPlay: (sqrArr: string[]) => void
  }) {
  // {/* non-breaking space to ensure some content inside the button to avoid the sizing bug when initializing value as null */}
  // const [squares, setSquares] = useState(Array(9).fill('\u00A0'))
  // const [xIsNext, setXNext] = useState(true)

  const winner = calcWinner(squares)
  const status = winner ? `Winner: ${winner}` : `Next Player: ${xIsNext? 'X': 'O'}`;

  function handleClick(i: number) {
    if (squares[i] !== '\u00A0' || calcWinner(squares)) {
      return
    }
    
    const newSquares = squares.slice()

    if (xIsNext) {
      newSquares[i] = 'X'
    } else {
      newSquares[i] = 'O'
    }

    onPlay(newSquares)
      
    // setSquares(newSquares)
    // setXNext(!xIsNext)
  }

  return (
    <div className="p-12">
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </div>
  )
}

export default function Game() {
    {/* non-breaking space to ensure some content inside the button to avoid the sizing bug when initializing value as null */}
    const [history, setHistory] = useState([Array(9).fill('\u00A0')])
    const [xIsNext, setXNext] = useState(true)
    const currentSquares = history[history.length - 1]

  function handlePlay(newSquares: string[]) {
    setHistory([...history, newSquares])
    setXNext(!xIsNext)
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}

function calcWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]

    if ((squares[a] !== '\u00A0') && (squares[a] === squares[b]) && (squares[a] === squares[c])) {
      return squares[a]
    } 
  }

  return null
}