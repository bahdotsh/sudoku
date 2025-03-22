import React from "react";
import "./VirtualKeyboard.css";

const VirtualKeyboard = ({ onKeyPress }) => {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "Clear"];

  return (
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
  );
};

export default VirtualKeyboard;
