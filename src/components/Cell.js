import React from "react";
import "./Cell.css";

const Cell = ({ value, isInitial, hasError, onChange }) => {
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
    <div
      className={`sudoku-cell ${isInitial ? "initial" : ""} ${hasError ? "error" : ""}`}
    >
      <input
        type="text"
        className="sudoku-cell-content"
        value={value === 0 ? "" : value}
        onChange={handleChange}
        readOnly={isInitial}
        maxLength={1}
        style={{
          border: "none",
          background: "transparent",
          width: "100%",
          height: "100%",
          fontSize: "inherit",
        }}
      />
    </div>
  );
};

export default Cell;
