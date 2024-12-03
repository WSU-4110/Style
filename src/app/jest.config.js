   // setup.js or jest.config.js
   import { JSDOM } from 'jsdom';

   const dom = new JSDOM();
   global.document = dom.window.document;
   global.window = dom.window;


module.exports = {
  roots: ['<rootDir>/homepage'],
  testMatch: ['**/*.test.tsx', '**/*.test.ts'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  
  // Make sure that Jest uses babel-jest for transformation
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest', // Transpile TypeScript/JS
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testPathIgnorePatterns: ['/node_modules/'],
};
