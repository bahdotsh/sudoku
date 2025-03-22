import React from "react";
import Cell from "./Cell";
import "./SudokuBoard.css";

const SudokuBoard = ({ board, initialBoard, onCellChange }) => {
  const renderCell = (row, col) => {
    const value = board[row][col];
    const isInitial = initialBoard[row][col] !== 0;

    return (
      <Cell
        key={`cell-${row}-${col}`}
        value={value}
        isInitial={isInitial}
        onChange={(newValue) => onCellChange(row, col, newValue)}
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

  return <div className="sudoku-board">{renderBoard()}</div>;
};

export default SudokuBoard;
