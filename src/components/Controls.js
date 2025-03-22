import React, { useState, useEffect, useRef } from "react";
import "./Controls.css";

const Controls = ({ onGenerate, onHint, gameTime }) => {
  const [difficulty, setDifficulty] = useState("easy");
  const initialRender = useRef(true);

  // Only generate a new puzzle when difficulty changes, not on every render
  useEffect(() => {
    // Skip the effect on the very first render since App.js already generates a puzzle
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    // Generate new puzzle when difficulty changes
    onGenerate(difficulty);
  }, [difficulty]); // Don't include onGenerate in dependencies to avoid infinite loop

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  // Format time in MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="controls-container">
      <div className="top-controls">
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

        <div className="timer-display">{formatTime(gameTime)}</div>
      </div>

      <div className="hint-button" onClick={onHint}>
        <i className="hint-icon">💡</i>
      </div>
    </div>
  );
};

export default Controls;
