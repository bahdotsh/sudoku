import React, { useState } from "react";
import SudokuBoard from "./components/SudokuBoard";
import Controls from "./components/Controls";
import { solveSudoku, generatePuzzle } from "./utils/sudokuUtils";
import "./App.css";

function App() {
  // Initialize empty board (0 represents empty cells)
  const emptyBoard = Array(9)
    .fill()
    .map(() => Array(9).fill(0));
  const [board, setBoard] = useState(emptyBoard);
  const [initialBoard, setInitialBoard] = useState(emptyBoard);

  // Solve the current puzzle
  const handleSolve = () => {
    const boardCopy = board.map((row) => [...row]);
    if (solveSudoku(boardCopy)) {
      setBoard(boardCopy);
    } else {
      alert("No solution exists for this puzzle!");
    }
  };

  // Generate a new puzzle with selected difficulty
  const handleGenerate = (difficulty) => {
    const { puzzle, solution } = generatePuzzle(difficulty);
    setBoard(puzzle.map((row) => [...row]));
    setInitialBoard(puzzle.map((row) => [...row]));
  };

  // Reset to initial state of current puzzle
  const handleReset = () => {
    setBoard(initialBoard.map((row) => [...row]));
  };

  // Clear the board completely
  const handleClear = () => {
    setBoard(emptyBoard.map((row) => [...row]));
    setInitialBoard(emptyBoard.map((row) => [...row]));
  };

  // Update cell value
  const handleCellChange = (row, col, value) => {
    const newBoard = [...board];
    newBoard[row][col] = value;
    setBoard(newBoard);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Sudoku Solver & Generator</h1>
      </header>
      <main>
        <SudokuBoard
          board={board}
          initialBoard={initialBoard}
          onCellChange={handleCellChange}
        />
        <Controls
          onSolve={handleSolve}
          onGenerate={handleGenerate}
          onReset={handleReset}
          onClear={handleClear}
        />
      </main>
    </div>
  );
}

export default App;
