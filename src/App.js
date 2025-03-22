import React, { useState, useEffect } from "react";
import SudokuBoard from "./components/SudokuBoard";
import Controls from "./components/Controls";
import {
  solveSudoku,
  generatePuzzle,
  isSudokuValid,
  findEmptyCell,
} from "./utils/sudokuUtils";
import "./App.css";

function App() {
  // Initialize empty board (0 represents empty cells)
  const emptyBoard = Array(9)
    .fill()
    .map(() => Array(9).fill(0));

  const [board, setBoard] = useState(emptyBoard);
  const [initialBoard, setInitialBoard] = useState(emptyBoard);
  const [solution, setSolution] = useState(emptyBoard);
  const [highlightError, setHighlightError] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Start the timer
  useEffect(() => {
    let interval = null;

    if (timerActive) {
      interval = setInterval(() => {
        setGameTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerActive]);

  // Generate a new puzzle on first render
  useEffect(() => {
    handleGenerate("easy");
  }, []);

  // Solve the current puzzle
  const handleSolve = () => {
    const boardCopy = board.map((row) => [...row]);
    if (solveSudoku(boardCopy)) {
      setBoard(boardCopy);
      setTimerActive(false);
    } else {
      alert("No solution exists for this puzzle!");
    }
  };

  // Generate a new puzzle with selected difficulty
  const handleGenerate = (difficulty) => {
    const { puzzle, solution: solvedPuzzle } = generatePuzzle(difficulty);
    setBoard(puzzle.map((row) => [...row]));
    setInitialBoard(puzzle.map((row) => [...row]));
    setSolution(solvedPuzzle);
    setHighlightError(false);
    setGameTime(0);
    setTimerActive(true);
  };

  // Reset to initial state of current puzzle
  const handleReset = () => {
    setBoard(initialBoard.map((row) => [...row]));
    setHighlightError(false);
    setGameTime(0);
    setTimerActive(true);
  };

  // Clear the board completely
  const handleClear = () => {
    setBoard(emptyBoard.map((row) => [...row]));
    setInitialBoard(emptyBoard.map((row) => [...row]));
    setSolution(emptyBoard);
    setHighlightError(false);
    setGameTime(0);
    setTimerActive(false);
  };

  // Check if the current solution is correct
  const handleCheck = () => {
    setHighlightError(true);

    // Check if the board is fully filled
    const hasEmptyCells = board.some((row) => row.some((cell) => cell === 0));

    if (hasEmptyCells) {
      alert("The puzzle is not complete yet. Fill in all cells first!");
      return;
    }

    if (isSudokuValid(board)) {
      alert("Congratulations! Your solution is correct!");
      setTimerActive(false);
    } else {
      alert(
        "Your solution contains errors. The incorrect cells are highlighted.",
      );
    }
  };

  // Provide a hint by filling in one correct cell
  const handleHint = () => {
    const emptyCell = findEmptyCell(board);

    if (!emptyCell) {
      alert("No empty cells to provide hints for!");
      return;
    }

    const [row, col] = emptyCell;
    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = solution[row][col];
    setBoard(newBoard);
  };

  // Update cell value
  const handleCellChange = (row, col, value) => {
    // Don't update if it's an initial cell
    if (initialBoard[row][col] !== 0) return;

    const newBoard = [...board];
    newBoard[row][col] = value;
    setBoard(newBoard);

    // Start timer if it's not active yet
    if (!timerActive) {
      setTimerActive(true);
    }
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
          highlightError={highlightError}
        />
        <Controls
          onSolve={handleSolve}
          onGenerate={handleGenerate}
          onReset={handleReset}
          onClear={handleClear}
          onCheck={handleCheck}
          onHint={handleHint}
          gameTime={gameTime}
        />
      </main>
    </div>
  );
}

export default App;
