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
  const [isSolved, setIsSolved] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [incorrectCells, setIncorrectCells] = useState([]);
  const [message, setMessage] = useState(null);
  const [boardCandidates, setBoardCandidates] = useState(
    Array(9)
      .fill()
      .map(() => Array(9).fill([])),
  );

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

  // Check if board is complete and correct
  useEffect(() => {
    // Check if there are any empty cells
    const hasEmptyCells = board.some((row) => row.some((cell) => cell === 0));
    setIsComplete(!hasEmptyCells);

    if (!hasEmptyCells) {
      // If complete, check if valid
      const valid = isSudokuValid(board);
      setIsSolved(valid);

      if (valid) {
        // Puzzle solved successfully
        setTimerActive(false);
      }
    } else {
      setIsSolved(false);
    }

    // Always check for errors when the board changes
    setHighlightError(true);
    setTimeout(() => setHighlightError(false), 1000);
  }, [board]);

  // Solve the current puzzle
  const handleSolve = () => {
    // Create a copy of the current board
    const boardCopy = board.map((row) => [...row]);

    // Check if there are incorrect values before solving
    const foundIncorrectCells = findIncorrectCells(board, solution);

    if (foundIncorrectCells.length > 0) {
      // Highlight incorrect cells
      setIncorrectCells(foundIncorrectCells);

      // Show error message
      setMessage("Incorrect numbers detected!");

      // Set timeouts to clear the highlights after a delay
      setTimeout(() => {
        setMessage(null);
        setIncorrectCells([]);
      }, 3000);

      // Visual feedback for errors
      setHighlightError(true);
      setTimeout(() => setHighlightError(false), 2000);
    } else {
      // Clear any previous incorrect cells
      setIncorrectCells([]);

      // No incorrect entries, proceed with solving
      if (solveSudoku(boardCopy)) {
        setBoard(boardCopy);
        setTimerActive(false);
        setIsSolved(true);
      } else {
        // Visual feedback for no solution
        setHighlightError(true);
        setTimeout(() => setHighlightError(false), 2000);
      }
    }
  };

  const findIncorrectCells = (currentBoard, correctSolution) => {
    const incorrectCells = [];

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        // Only check cells that user has filled (not empty and not initial)
        if (currentBoard[row][col] !== 0 && initialBoard[row][col] === 0) {
          // If user's entry doesn't match the solution
          if (currentBoard[row][col] !== solution[row][col]) {
            incorrectCells.push([row, col]);
          }
        }
      }
    }

    return incorrectCells;
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
    setIsSolved(false);
    setIsComplete(false);
    setIncorrectCells([]);
    setMessage(null);
    // Clear all candidates
    setBoardCandidates(
      Array(9)
        .fill()
        .map(() => Array(9).fill([])),
    );
  };

  // Reset to initial state of current puzzle
  const handleReset = () => {
    setBoard(initialBoard.map((row) => [...row]));
    setHighlightError(false);
    setGameTime(0);
    setTimerActive(true);
    setIsSolved(false);
    setIsComplete(false);
    setIncorrectCells([]);
    setMessage(null);
    // Clear all candidates
    setBoardCandidates(
      Array(9)
        .fill()
        .map(() => Array(9).fill([])),
    );
  };

  // Provide a hint by filling in one correct cell
  const handleHint = () => {
    const emptyCell = findEmptyCell(board);

    if (!emptyCell) {
      return; // No empty cells to provide hints for
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

    // Clear any candidates for this cell if we're setting a value
    if (value !== 0) {
      const newCandidates = [...boardCandidates];
      newCandidates[row][col] = [];
      setBoardCandidates(newCandidates);
    }

    // Start timer if it's not active yet
    if (!timerActive) {
      setTimerActive(true);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Sudoku</h1>
      </header>
      <main>
        <div className="game-container">
          <Controls
            onGenerate={handleGenerate}
            onHint={handleHint}
            gameTime={gameTime}
          />
          <SudokuBoard
            board={board}
            initialBoard={initialBoard}
            onCellChange={handleCellChange}
            highlightError={highlightError}
            isSolved={isSolved}
            isComplete={isComplete}
            onReset={handleReset}
            onSolve={handleSolve}
            incorrectCells={incorrectCells}
            message={message}
            boardCandidates={boardCandidates}
            setBoardCandidates={setBoardCandidates}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
