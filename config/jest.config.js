/**
 * @type {Partial<jest.InitialOptions>}
 */
const config = {
  preset: 'ts-jest',
  rootDir: '..',
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.ts?(x)',
    '<rootDir>/src/**/?(*.)+(spec|test).ts?(x)',
  ],
  testPathIgnorePatterns: ['dist'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/config/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  setupFiles: ['<rootDir>/config/setup-tests.js'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}

module.exports = config
