// mockData.js
export const mockLogs = [
  {
    _id: "1",
    expression: "5 + 3",
    isValid: true,
    output: 8,
    createdOn: new Date().toISOString(),
  },
  {
    _id: "2",
    expression: "10 / 2",
    isValid: true,
    output: 5,
    createdOn: new Date().toISOString(),
  },
  {
    _id: "3",
    expression: "5 +",
    isValid: false,
    output: null,
    createdOn: new Date().toISOString(),
  },
];
