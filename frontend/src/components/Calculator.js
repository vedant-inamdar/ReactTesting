import React, { useState, useEffect } from "react";
import "./Calculator.css";
import LogTable from "./LogTable.js";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [logs, setLogs] = useState([]);

  const handleClick = (value) => {
    if (!isNaN(value) || value === ".") {
      setExpression((prev) => prev + value);
    } else if (value === "AC") {
      setExpression("");
    } else if (value === "DEL") {
      setExpression((prev) => prev.slice(0, -1));
    } else if (value === "=") {
      evaluate();
    } else {
      if (expression && !isNaN(expression.slice(-1))) {
        setExpression((prev) => prev + value);
      }
    }
  };

  const evaluate = async () => {
    try {
      const res = eval(expression);
      setExpression(res.toString());
      await logExpression(expression, res);
    } catch (error) {
      setExpression("Error");
    }
  };

  const logExpression = async (expression) => {
    try {
      const response = await fetch("http://localhost:8080/api/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ expression }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);
      } else {
        console.error("Failed to log expression:", response.status);
      }
    } catch (error) {
      console.error("Error logging expression:", error);
    }
  };

  // Placeholder for log fetching logic if needed
  const fetchLogs = async () => {
    // Implement fetch logic if necessary
  };

  useEffect(() => {
    fetchLogs(); // You can remove this if not needed
  }, []);

  return (
    <div className="holder">
      <div className="calculator">
        <div className="display">
          <input
            type="text"
            className="display-input"
            value={expression}
            readOnly
          />
        </div>
        <div className="buttons">
          {[
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
          ].map((label) => (
            <button
              key={label}
              className={
                label === "="
                  ? "button operator equal"
                  : "button" +
                    (["AC", "DEL", "%", "/"].includes(label) ? " operator" : "")
              }
              onClick={() => handleClick(label)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <LogTable logs={logs} />
    </div>
  );
};

export default Calculator;
