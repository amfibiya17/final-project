import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Signup from "./signup";

test("Name input should be rendered", () => {
  render(
    <Router>
      <Signup />
    </Router>
  );
  const nameInputEl = screen.getByPlaceholderText(/name/i);
  expect(nameInputEl).toBeInTheDocument();
});
