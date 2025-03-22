# Sudoku

A modern, interactive Sudoku game built with React, featuring multiple difficulty levels, solving assistance, and a clean, responsive design.

This app is deployed on [](https://sudoku.gokuls.in)!

## Features

- **Multiple Difficulty Levels**: Choose from Easy, Medium, Hard, and Expert puzzles
- **Intelligent Puzzle Generation**: Create random, solvable Sudoku puzzles
- **Solving Assistance**:
  - Check your progress at any time
  - Get hints when stuck
  - Auto-solve the current puzzle
- **Game Timer**: Track your solving time
- **Error Highlighting**: Visual feedback for incorrect entries
- **Mobile Friendly**: Responsive design with virtual keyboard for touch devices
- **Clean UI**: Modern, intuitive interface

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/sudoku.git
   cd sudoku
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## How to Play

1. Select a difficulty level from the dropdown menu
2. Click "Generate New Puzzle" to start a new game
3. Click on a cell to select it
4. Enter a number (1-9) in the selected cell
   - On desktop: Use your keyboard
   - On mobile: Use the virtual keyboard
5. Use the control buttons to:
   - Check your solution
   - Get a hint
   - Solve the puzzle automatically
   - Reset the puzzle
   - Clear the board

## Project Structure

```
sudoku/src/
├── App.js                  # Main application component
├── App.css                 # Application styles
├── components/             # UI components
│   ├── Cell.js             # Individual sudoku cell
│   ├── Controls.js         # Game control buttons
│   ├── SudokuBoard.js      # The sudoku grid
│   └── VirtualKeyboard.js  # Mobile number input
└── utils/
    └── sudokuUtils.js      # Puzzle generation and solving algorithms
```

## Technology Stack

- React
- JavaScript (ES6+)
- CSS3

## Algorithm Highlights

- **Puzzle Generation**: Creates valid, unique Sudoku puzzles with varying difficulty
- **Backtracking Solver**: Efficiently solves Sudoku puzzles using a recursive backtracking algorithm
- **Solution Validation**: Checks if the current board state is valid according to Sudoku rules

## Future Enhancements

- Save game progress in local storage
- User accounts and leaderboards
- Additional puzzle types (Killer Sudoku, etc.)
- Dark mode theme
- Sound effects and animations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
