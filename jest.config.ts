/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
    "\\.svg$": "svg-jest",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
    "\\.svg$": "svg-jest",
  },
};
