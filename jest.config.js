module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,ts}",
    "!**/node_modules/**",
    "!**/vendor/**"
  ]
};
