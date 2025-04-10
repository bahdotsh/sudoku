import React from "react";
import "./VirtualKeyboard.css";

const VirtualKeyboard = ({
  onKeyPress,
  candidateMode,
  toggleCandidateMode,
}) => {
  return (
    <div className="virtual-keyboard-container">
      <div
        className={`virtual-keyboard ${candidateMode ? "candidate-mode" : ""}`}
      >
        {/* First row: 1-2-3 */}
        <button className="keyboard-key" onClick={() => onKeyPress("1")}>
          1
        </button>
        <button className="keyboard-key" onClick={() => onKeyPress("2")}>
          2
        </button>
        <button className="keyboard-key" onClick={() => onKeyPress("3")}>
          3
        </button>

        {/* Second row: 4-5-6 */}
        <button className="keyboard-key" onClick={() => onKeyPress("4")}>
          4
        </button>
        <button className="keyboard-key" onClick={() => onKeyPress("5")}>
          5
        </button>
        <button className="keyboard-key" onClick={() => onKeyPress("6")}>
          6
        </button>

        {/* Third row: 7-8-9 */}
        <button className="keyboard-key" onClick={() => onKeyPress("7")}>
          7
        </button>
        <button className="keyboard-key" onClick={() => onKeyPress("8")}>
          8
        </button>
        <button className="keyboard-key" onClick={() => onKeyPress("9")}>
          9
        </button>

        {/* Fourth row: Clear and Candidate mode buttons */}
        <button
          className="keyboard-key key-clear"
          onClick={() => onKeyPress("0")}
        >
          Clear
        </button>
        <button
          className={`keyboard-key key-mode ${candidateMode ? "active" : ""}`}
          onClick={toggleCandidateMode}
        >
          {candidateMode ? "Normal" : "Notes"}
        </button>
      </div>
    </div>
  );
};

export default VirtualKeyboard;
