import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Sudoku app header", () => {
  render(<App />);
  const headerElement = screen.getByText(/Sudoku Solver & Generator/i);
  expect(headerElement).toBeInTheDocument();
});
