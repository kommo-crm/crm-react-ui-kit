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
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(@kommo-crm/storybook|nanoid)/)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@$': '<rootDir>/src/index.ts',
  },
};

export default config;
