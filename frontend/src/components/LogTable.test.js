import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LogTable from "./LogTable";
import { mockLogs } from "./mockLogs";

describe("LogTable Component", () => {
  test("renders log table with mock data", () => {
    render(<LogTable logs={mockLogs} />);

    // Check if the table headers are present
    expect(screen.getByText("Sr No.")).toBeInTheDocument();
    expect(screen.getByText("Expression")).toBeInTheDocument();
    // expect(screen.getByText("Valid")).toBeInTheDocument();
    expect(screen.getByText("Output")).toBeInTheDocument();
    // expect(screen.getByText("Created On")).toBeInTheDocument();

    // Check if the mock data is rendered in the table
    mockLogs.forEach((log, index) => {
      expect(screen.getByText(log.expression)).toBeInTheDocument();
      //   expect(screen.getByText(log.isValid ? "Yes" : "No")).toBeInTheDocument();
      expect(
        screen.getByText(log.output !== null ? log.output : "N/A")
      ).toBeInTheDocument();
      //   expect(
      //     screen.getByText(new Date(log.createdOn).toLocaleString())
      //   ).toBeInTheDocument();
    });
  });
});
