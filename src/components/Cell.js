import React from "react";
import "./Cell.css";

const Cell = ({
  value,
  isInitial,
  hasError,
  isSuccess,
  isActive,
  onChange,
  onFocus,
}) => {
  const cellClass = `sudoku-cell
    ${isInitial ? "initial" : ""}
    ${hasError ? "error" : ""}
    ${isSuccess ? "success" : ""}
    ${isActive ? "active" : ""}`;

  return (
    <div className={cellClass} onClick={() => !isInitial && onFocus()}>
      <div className="sudoku-cell-content">{value === 0 ? "" : value}</div>
    </div>
  );
};

export default Cell;
