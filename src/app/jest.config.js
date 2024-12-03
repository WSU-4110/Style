module.exports = {
  roots: ['<rootDir>/homepage'],
  testMatch: [
    "<rootDir>/homepage/**/*.(test|spec).[tj]s?(x)"
  ],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  
  // Make sure that Jest uses babel-jest for transformation
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest', // Transpile TypeScript/JS
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testPathIgnorePatterns: ['/node_modules/'],
};
