import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  transform: {
    '.+\\.(css)$': 'jest-css-modules-transform',
    '^.+\\.(t|j)sx?$': '@swc/jest',
    '^.+\\.svg$': 'jest-transformer-svg',
  },
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)'],
  testPathIgnorePatterns: ['<rootDir>/src/.*\\.e2e\\.test\\.(ts|tsx)$'],
  transformIgnorePatterns: ['<rootDir>/node_modules/!(nanoid)'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^src$': '<rootDir>/src/index.ts',
    '^@kommo-crm/react-hooks$':
      '<rootDir>/node_modules/@kommo-crm/react-hooks/dist/index.js',
  },
};

export default config;
