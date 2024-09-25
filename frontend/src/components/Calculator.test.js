import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Calculator from "./Calculator";

// Mocking fetch API
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: "Expression logged", output: 7 }),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks(); // Clear mocks after each test
});

describe("Calculator Component", () => {
  test("renders calculator with initial state", () => {
    render(<Calculator />);

    const displayInput = screen.getByRole("textbox");
    expect(displayInput).toBeInTheDocument();
    expect(displayInput).toHaveValue("");

    const buttons = [
      "AC",
      "%",
      "DEL",
      "/",
      "7",
      "8",
      "9",
      "*",
      "4",
      "5",
      "6",
      "-",
      "1",
      "2",
      "3",
      "+",
      "00",
      "0",
      ".",
      "=",
    ];
    buttons.forEach((button) => {
      expect(screen.getByText(button)).toBeInTheDocument();
    });
  });

  test("handles button clicks correctly", async () => {
    render(<Calculator />);

    fireEvent.click(screen.getByText("5"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("="));

    const displayInput = screen.getByRole("textbox");
    await waitFor(() => expect(displayInput).toHaveValue("7"));
  });

  test("clears input when AC is pressed", () => {
    render(<Calculator />);

    fireEvent.click(screen.getByText("5"));
    fireEvent.click(screen.getByText("AC"));

    const displayInput = screen.getByRole("textbox");
    expect(displayInput).toHaveValue("");
  });

  test("deletes last character when DEL is pressed", () => {
    render(<Calculator />);

    fireEvent.click(screen.getByText("5"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("DEL"));

    const displayInput = screen.getByRole("textbox");
    expect(displayInput).toHaveValue("5+");
  });

  test("shows error for invalid expression", () => {
    render(<Calculator />);

    fireEvent.click(screen.getByText("5"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("=")); // Missing number after operator

    const displayInput = screen.getByRole("textbox");
    expect(displayInput).toHaveValue("Error");
  });

  test("handles API call for logging expression", async () => {
    render(<Calculator />);

    fireEvent.click(screen.getByText("5"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("="));

    const displayInput = screen.getByRole("textbox");
    await waitFor(() => expect(displayInput).toHaveValue("7"));

    expect(fetch).toHaveBeenCalledWith("http://localhost:8080/api/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ expression: "5+2" }),
    });
  });
});
