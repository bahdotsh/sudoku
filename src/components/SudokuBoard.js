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
}) => {
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [activeCell, setActiveCell] = useState(null);

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
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeCell]); // Re-add event listener when active cell changes

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
      setMessage("Puzzle Solved!");
      setMessageType("success");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } else if (isComplete && !isSolved) {
      setMessage("There are some errors");
      setMessageType("incomplete");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  }, [isSolved, isComplete]);

  const handleCellFocus = (row, col) => {
    if (initialBoard[row][col] === 0) {
      setActiveCell([row, col]);
    }
  };

  const handleKeyPress = (key) => {
    if (!activeCell) return;

    const [row, col] = activeCell;
    const value = key === "0" ? 0 : parseInt(key);
    onCellChange(row, col, value);
  };

  const renderCell = (row, col) => {
    const value = board[row][col];
    const isInitial = initialBoard[row][col] !== 0;
    const hasError =
      highlightError &&
      !isInitial &&
      value !== 0 &&
      !isValidPlacement(board, row, col, value);
    const isActive =
      activeCell && activeCell[0] === row && activeCell[1] === col;

    return (
      <Cell
        key={`cell-${row}-${col}`}
        value={value}
        isInitial={isInitial}
        hasError={hasError}
        isSuccess={isSolved}
        isActive={isActive}
        onChange={(newValue) => onCellChange(row, col, newValue)}
        onFocus={() => handleCellFocus(row, col)}
      />
    );
  };

  // Function to check if a placement is valid
  const isValidPlacement = (board, row, col, num) => {
    // Check row
    for (let i = 0; i < 9; i++) {
      if (i !== col && board[row][i] === num) {
        return false;
      }
    }

    // Check column
    for (let i = 0; i < 9; i++) {
      if (i !== row && board[i][col] === num) {
        return false;
      }
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const r = boxRow + i;
        const c = boxCol + j;
        if ((r !== row || c !== col) && board[r][c] === num) {
          return false;
        }
      }
    }

    return true;
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

  return (
    <div className="sudoku-container">
      <div className="sudoku-board">
        {renderBoard()}
        <div
          className={`board-message ${message ? "visible" : ""} ${messageType || ""}`}
        >
          {message}
        </div>
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
      <VirtualKeyboard onKeyPress={handleKeyPress} />
    </div>
  );
};

export default SudokuBoard;
