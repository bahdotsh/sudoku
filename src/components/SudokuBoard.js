import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import VirtualKeyboard from "./VirtualKeyboard";
import "./SudokuBoard.css";

const SudokuBoard = ({
  board,
  initialBoard,
  onCellChange,
  highlightError,
  isSolved,
  isComplete,
  onReset,
  onSolve,
  incorrectCells,
  message,
  boardCandidates,
  setBoardCandidates,
}) => {
  const [localMessage, setLocalMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [activeCell, setActiveCell] = useState(null);
  const [candidateMode, setCandidateMode] = useState(false);
  const [internalBoardCandidates, setInternalBoardCandidates] = useState(
    boardCandidates ||
      Array(9)
        .fill()
        .map(() => Array(9).fill([])),
  );

  // Use boardCandidates from props if provided, otherwise use internal state
  const candidates = boardCandidates || internalBoardCandidates;
  const updateCandidates = setBoardCandidates || setInternalBoardCandidates;

  // Add keyboard event listener for physical keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeCell) return;

      // Handle number keys 1-9
      if (e.key >= "1" && e.key <= "9") {
        handleKeyPress(e.key);
      }
      // Handle backspace, delete or 0 to clear a cell
      else if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") {
        handleKeyPress("0");
      }
      // Handle arrow keys for navigation
      else if (e.key.startsWith("Arrow")) {
        navigateWithArrowKeys(e.key);
      }
      // Toggle candidate mode with Tab or 'n' key
      else if (e.key === "Tab" || e.key.toLowerCase() === "n") {
        e.preventDefault();
        toggleCandidateMode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeCell, candidateMode]); // Re-add event listener when active cell or mode changes

  // Add arrow key navigation
  const navigateWithArrowKeys = (key) => {
    if (!activeCell) return;

    const [row, col] = activeCell;
    let newRow = row;
    let newCol = col;

    switch (key) {
      case "ArrowUp":
        newRow = Math.max(0, row - 1);
        break;
      case "ArrowDown":
        newRow = Math.min(8, row + 1);
        break;
      case "ArrowLeft":
        newCol = Math.max(0, col - 1);
        break;
      case "ArrowRight":
        newCol = Math.min(8, col + 1);
        break;
      default:
        return;
    }

    // Skip cells that are part of the initial board (can't be edited)
    if (initialBoard[newRow][newCol] === 0) {
      setActiveCell([newRow, newCol]);
    } else {
      // If the target cell is locked, try to find the next available cell in that direction
      if (key === "ArrowUp" || key === "ArrowDown") {
        for (
          let r = key === "ArrowUp" ? newRow - 1 : newRow + 1;
          key === "ArrowUp" ? r >= 0 : r <= 8;
          key === "ArrowUp" ? r-- : r++
        ) {
          if (initialBoard[r][newCol] === 0) {
            setActiveCell([r, newCol]);
            break;
          }
        }
      } else {
        for (
          let c = key === "ArrowLeft" ? newCol - 1 : newCol + 1;
          key === "ArrowLeft" ? c >= 0 : c <= 8;
          key === "ArrowLeft" ? c-- : c++
        ) {
          if (initialBoard[newRow][c] === 0) {
            setActiveCell([newRow, c]);
            break;
          }
        }
      }
    }
  };

  useEffect(() => {
    if (isSolved) {
      setLocalMessage("Puzzle Solved!");
      setMessageType("success");
      setTimeout(() => {
        setLocalMessage(null);
      }, 3000);
    } else if (isComplete && !isSolved) {
      setLocalMessage("There are some errors");
      setMessageType("incomplete");
      setTimeout(() => {
        setLocalMessage(null);
      }, 3000);
    }
  }, [isSolved, isComplete]);

  const handleCellFocus = (row, col) => {
    if (initialBoard[row][col] === 0) {
      setActiveCell([row, col]);
    }
  };

  const toggleCandidateMode = () => {
    setCandidateMode(!candidateMode);
  };

  const handleKeyPress = (key) => {
    if (!activeCell) return;

    const [row, col] = activeCell;

    // If in normal mode
    if (!candidateMode) {
      const value = key === "0" ? 0 : parseInt(key);
      onCellChange(row, col, value);

      // Clear candidates when setting a value
      if (value !== 0) {
        const newCandidates = [...candidates];
        newCandidates[row][col] = [];
        updateCandidates(newCandidates);
      }
      return;
    }

    // In candidate mode
    if (board[row][col] !== 0) return; // Don't add candidates to filled cells

    if (key === "0") {
      // Clear all candidates for this cell
      const newCandidates = candidates.map((row) => [...row]);
      newCandidates[row][col] = [];
      updateCandidates(newCandidates);
      return;
    }

    const numKey = parseInt(key);
    const newCandidates = candidates.map((row) => [...row]);

    // Toggle the candidate
    if (newCandidates[row][col].includes(numKey)) {
      // Remove the candidate
      newCandidates[row][col] = newCandidates[row][col].filter(
        (n) => n !== numKey,
      );
    } else {
      // Add the candidate (limit to 4 candidates max)
      if (newCandidates[row][col].length < 4) {
        newCandidates[row][col] = [...newCandidates[row][col], numKey].sort();
      }
    }

    updateCandidates(newCandidates);
  };

  const renderCell = (row, col) => {
    const value = board[row][col];
    const isInitial = initialBoard[row][col] !== 0;

    // Check if this cell is in the incorrectCells array
    const isIncorrect =
      incorrectCells && incorrectCells.some(([r, c]) => r === row && c === col);

    // Only highlight errors when the entire board is complete or cell is marked incorrect
    const hasError =
      (isComplete && !isSolved && value !== 0 && !isInitial) || isIncorrect;

    const isActive =
      activeCell && activeCell[0] === row && activeCell[1] === col;

    return (
      <Cell
        key={`cell-${row}-${col}`}
        value={value}
        candidates={candidates[row][col]}
        isInitial={isInitial}
        hasError={hasError}
        isSuccess={isSolved}
        isActive={isActive}
        onChange={(newValue) => onCellChange(row, col, newValue)}
        onFocus={() => handleCellFocus(row, col)}
      />
    );
  };

  const renderBox = (boxRow, boxCol) => {
    const cells = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const row = boxRow * 3 + i;
        const col = boxCol * 3 + j;
        cells.push(renderCell(row, col));
      }
    }

    return (
      <div key={`box-${boxRow}-${boxCol}`} className="sudoku-box">
        {cells}
      </div>
    );
  };

  const renderBoard = () => {
    const boxes = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        boxes.push(renderBox(i, j));
      }
    }
    return boxes;
  };

  // Use message from props or localMessage
  const displayMessage = message || localMessage;

  return (
    <div className="sudoku-container">
      <div className="sudoku-board">
        {renderBoard()}
        <div
          className={`board-message ${displayMessage ? "visible" : ""} ${messageType || ""}`}
        >
          {displayMessage}
        </div>
      </div>

      {/* Input mode indicator */}
      <div className="input-mode-indicator">
        {candidateMode
          ? "Notes Mode: Add possible values"
          : "Normal Mode: Enter numbers"}
      </div>

      {/* Bottom action buttons */}
      <div className="board-actions">
        <button className="board-button reset-button" onClick={onReset}>
          Reset
        </button>
        <button className="board-button solve-button" onClick={onSolve}>
          Solve
        </button>
      </div>

      {/* Virtual keyboard */}
      <VirtualKeyboard
        onKeyPress={handleKeyPress}
        candidateMode={candidateMode}
        toggleCandidateMode={toggleCandidateMode}
      />
    </div>
  );
};

export default SudokuBoard;
