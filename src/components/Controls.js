import React, { useState } from "react";
import "./Controls.css";

const Controls = ({ onSolve, onGenerate, onReset, onClear }) => {
  const [difficulty, setDifficulty] = useState("easy");

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  return (
    <div className="controls">
      <div className="button-group">
        <button className="control-button solve" onClick={onSolve}>
          Solve Puzzle
        </button>
        <button className="control-button reset" onClick={onReset}>
          Reset
        </button>
        <button className="control-button clear" onClick={onClear}>
          Clear Board
        </button>
      </div>

      <div className="generate-controls">
        <select
          value={difficulty}
          onChange={handleDifficultyChange}
          className="difficulty-select"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="expert">Expert</option>
        </select>
        <button
          className="control-button generate"
          onClick={() => onGenerate(difficulty)}
        >
          Generate New Puzzle
        </button>
      </div>
    </div>
  );
};

export default Controls;
