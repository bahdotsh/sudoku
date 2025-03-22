import React from "react";
import "./Cell.css";

const Cell = ({ value, isInitial, hasError, isSuccess, onChange }) => {
  const handleChange = (e) => {
    const newValue = e.target.value;

    // Only allow digits 1-9 or empty
    if (
      newValue === "" ||
      (newValue.length === 1 && /^[1-9]$/.test(newValue))
    ) {
      onChange(newValue === "" ? 0 : parseInt(newValue));
    }
  };

  const cellClass = `sudoku-cell
    ${isInitial ? "initial" : ""}
    ${hasError ? "error" : ""}
    ${isSuccess ? "success" : ""}`;

  return (
    <div className={cellClass}>
      <input
        type="tel"
        inputMode="numeric"
        pattern="[1-9]*"
        className="sudoku-cell-content"
        value={value === 0 ? "" : value}
        onChange={handleChange}
        readOnly={isInitial}
        maxLength={1}
      />
    </div>
  );
};

export default Cell;
