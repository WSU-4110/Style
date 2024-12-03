module.exports = {
    testEnvironment: "jest-environment-jsdom",  
    transform: {
      '^.+\\.(ts|tsx)$': [
        "ts-jest",
        {
          tsconfig: "tsconfig.json",  
        },
      ],
      '^.+\\.(js|jsx)$': 'babel-jest',  
    },
    setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],  
    moduleNameMapper: {
      '\\.css$': 'identity-obj-proxy',  
    },
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],  
    transformIgnorePatterns: [
      'node_modules/(?!(some-esm-module|another-esm-module)/)'  
    ],
    testMatch: ["**/schedule/**/*.test.tsx"],  
  };
  