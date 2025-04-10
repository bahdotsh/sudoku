import React from "react";
import "./Cell.css";

const Cell = ({
  value,
  candidates,
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

  // Render candidates if no value is set
  const renderCandidates = () => {
    if (value !== 0 || !candidates || candidates.length === 0) return null;

    return (
      <div className="candidates-container">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <div
            key={num}
            className={`candidate ${candidates.includes(num) ? "visible" : ""}`}
          >
            {candidates.includes(num) ? num : ""}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={cellClass} onClick={() => !isInitial && onFocus()}>
      {value === 0 ? (
        renderCandidates()
      ) : (
        <div className="sudoku-cell-content">{value}</div>
      )}
    </div>
  );
};

export default Cell;
