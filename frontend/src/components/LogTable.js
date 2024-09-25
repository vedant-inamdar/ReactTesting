import React from "react";
import "./LogTable.css";

const LogTable = ({ logs }) => {
  return React.createElement(
    "div",
    { id: "table" },
    React.createElement(
      "table",
      null,
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement("th", null, "Sr No."),
          React.createElement("th", null, "Expression"),
          React.createElement("th", null, "Valid"),
          React.createElement("th", null, "Output"),
          React.createElement("th", null, "Created On")
        )
      ),
      React.createElement(
        "tbody",
        null,
        logs.map((log, index) =>
          React.createElement(
            "tr",
            { key: log._id },
            React.createElement("td", null, index + 1),
            React.createElement("td", null, log.expression),
            React.createElement("td", null, log.isValid ? "Yes" : "No"),
            React.createElement(
              "td",
              null,
              log.output !== null ? log.output : "N/A"
            ),
            React.createElement(
              "td",
              null,
              new Date(log.createdOn).toLocaleString()
            )
          )
        )
      )
    )
  );
};

export default LogTable;
