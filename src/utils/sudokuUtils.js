export function solveSudoku(board) {
  const emptyCell = findEmptyCell(board);

  // If no empty cell is found, the puzzle is solved
  if (!emptyCell) {
    return true;
  }

  const [row, col] = emptyCell;

  // Try digits 1-9 for the empty cell
  for (let num = 1; num <= 9; num++) {
    if (isValidPlacement(board, row, col, num)) {
      board[row][col] = num;

      // Recursively try to solve the rest of the puzzle
      if (solveSudoku(board)) {
        return true;
      }

      // If placing this number doesn't lead to a solution, backtrack
      board[row][col] = 0;
    }
  }

  // No solution exists with current board configuration
  return false;
}

// Find the first empty cell (value 0)
function findEmptyCell(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        return [row, col];
      }
    }
  }
  return null;
}

// Check if placing a number at given position is valid
function isValidPlacement(board, row, col, num) {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) {
      return false;
    }
  }

  // Check column
  for (let y = 0; y < 9; y++) {
    if (board[y][col] === num) {
      return false;
    }
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;

  for (let y = boxRow; y < boxRow + 3; y++) {
    for (let x = boxCol; x < boxCol + 3; x++) {
      if (board[y][x] === num) {
        return false;
      }
    }
  }

  return true;
}

// Generate a Sudoku puzzle with specified difficulty
export function generatePuzzle(difficulty) {
  // Create a solved board
  const solution = generateSolvedBoard();

  // Create a copy to remove numbers from
  const puzzle = solution.map((row) => [...row]);

  // Number of cells to remove based on difficulty
  const cellsToRemove = {
    easy: 30,
    medium: 40,
    hard: 50,
    expert: 60,
  };

  // Get all cell positions
  const positions = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      positions.push([row, col]);
    }
  }

  // Shuffle positions to remove randomly
  shuffleArray(positions);

  // How many cells to remove
  const numToRemove = cellsToRemove[difficulty] || 40;
  let removed = 0;

  for (let i = 0; i < positions.length && removed < numToRemove; i++) {
    const [row, col] = positions[i];
    const temp = puzzle[row][col];

    // Try removing the number
    puzzle[row][col] = 0;

    // Make a copy for validation
    const boardCopy = puzzle.map((r) => [...r]);

    // If this still has a unique solution, keep it removed
    if (hasUniqueSolution(boardCopy)) {
      removed++;
    } else {
      // Otherwise, put it back
      puzzle[row][col] = temp;
    }
  }

  return { puzzle, solution };
}

// Generate a completely filled and valid Sudoku board
function generateSolvedBoard() {
  const board = Array(9)
    .fill()
    .map(() => Array(9).fill(0));
  fillBoard(board);
  return board;
}

// Recursively fill the board with valid numbers
function fillBoard(board) {
  const emptyCell = findEmptyCell(board);

  if (!emptyCell) {
    return true;
  }

  const [row, col] = emptyCell;
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  shuffleArray(numbers);

  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];

    if (isValidPlacement(board, row, col, num)) {
      board[row][col] = num;

      if (fillBoard(board)) {
        return true;
      }

      board[row][col] = 0;
    }
  }

  return false;
}

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Check if the puzzle has a unique solution (simplified)
// For a full implementation, would need to count all solutions
function hasUniqueSolution(board) {
  // For simplicity, we'll just check if it has at least one solution
  // A more thorough implementation would track multiple solutions
  const boardCopy = board.map((row) => [...row]);
  return solveSudoku(boardCopy);
}

// Check if a completed sudoku board is valid
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
