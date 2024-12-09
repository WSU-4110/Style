module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    clearMocks: true,
  
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
      '\\.css$': 'identity-obj-proxy', 
    },
  
    collectCoverageFrom: [
      'src/**/*.{ts,tsx,js,jsx}',
      '!src/**/*.d.ts', 
      '!src/**/__tests__/**', 
      '!src/**/*.{test,spec}.{ts,tsx,js,jsx}', 
      '!src/public/**/*', 
    ],
  
    coverageThreshold: {
      global: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },

    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Use Babel to transform ESModules
    },
  };
  