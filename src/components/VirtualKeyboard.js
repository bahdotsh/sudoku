import React from "react";
import "./VirtualKeyboard.css";

const VirtualKeyboard = ({ onKeyPress }) => {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "Clear"];
  const isDesktop = window.innerWidth > 768;

  return (
    <div className="virtual-keyboard-container">
      {isDesktop && (
        <div className="keyboard-hint">
          You can also use your keyboard or arrow keys to navigate
        </div>
      )}
      <div className="virtual-keyboard">
        {keys.map((key) => (
          <button
            key={key}
            className={`keyboard-key ${key === "Clear" ? "key-clear" : ""}`}
            onClick={() => onKeyPress(key === "Clear" ? "0" : key)}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VirtualKeyboard;
