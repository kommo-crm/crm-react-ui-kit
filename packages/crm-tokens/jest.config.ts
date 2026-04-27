import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleNameMapper: {
    '^@/design/primitives$': '<rootDir>/src/design/__mocks__/primitives.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      { tsconfig: 'tsconfig.test.json', diagnostics: false },
    ],
  },
};

export default config;
