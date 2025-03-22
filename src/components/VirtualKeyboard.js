import React from "react";
import "./VirtualKeyboard.css";

const VirtualKeyboard = ({ onKeyPress }) => {
  // Arrange numbers in a 3x3 grid (1-9) with clear button at the bottom
  return (
    <div className="virtual-keyboard-container">
      <div className="virtual-keyboard">
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

        {/* Fourth row: Clear button spanning all 3 columns */}
        <button
          className="keyboard-key key-clear"
          onClick={() => onKeyPress("0")}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default VirtualKeyboard;
