import React from "react";
import "./Cell.css";

const Cell = ({ value, isInitial, onChange }) => {
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

  return (
    <input
      type="text"
      className={`sudoku-cell ${isInitial ? "initial" : ""}`}
      value={value === 0 ? "" : value}
      onChange={handleChange}
      readOnly={isInitial}
      maxLength={1}
    />
  );
};

export default Cell;
