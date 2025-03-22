import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import "./SudokuBoard.css";

const SudokuBoard = ({
  board,
  initialBoard,
  onCellChange,
  highlightError,
  isSolved,
  isComplete,
}) => {
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

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

  const renderCell = (row, col) => {
    const value = board[row][col];
    const isInitial = initialBoard[row][col] !== 0;
    const hasError =
      highlightError &&
      !isInitial &&
      value !== 0 &&
      !isValidPlacement(board, row, col, value);

    return (
      <Cell
        key={`cell-${row}-${col}`}
        value={value}
        isInitial={isInitial}
        hasError={hasError}
        isSuccess={isSolved}
        onChange={(newValue) => onCellChange(row, col, newValue)}
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
    <div className="sudoku-board">
      {renderBoard()}
      <div
        className={`board-message ${message ? "visible" : ""} ${messageType || ""}`}
      >
        {message}
      </div>
    </div>
  );
};

export default SudokuBoard;
