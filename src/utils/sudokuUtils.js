export const isSudokuValid = (board) => {
  // Check all rows, columns, and boxes
  for (let i = 0; i < 9; i++) {
    // Check row
    const rowSet = new Set();
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0 || rowSet.has(board[i][j])) return false;
      rowSet.add(board[i][j]);
    }

    // Check column
    const colSet = new Set();
    for (let j = 0; j < 9; j++) {
      if (board[j][i] === 0 || colSet.has(board[j][i])) return false;
      colSet.add(board[j][i]);
    }

    // Check 3x3 box
    const boxRow = Math.floor(i / 3) * 3;
    const boxCol = (i % 3) * 3;
    const boxSet = new Set();

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const value = board[boxRow + r][boxCol + c];
        if (value === 0 || boxSet.has(value)) return false;
        boxSet.add(value);
      }
    }
  }

  return true;
};

// Find an empty cell (for hints)
export const findEmptyCell = (board) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        return [i, j];
      }
    }
  }
  return null; // No empty cell found
};
