import { config } from 'dotenv';

config({ path: '.env.test' });

export default {
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/modules/**/dtos/*.ts',
    '!<rootDir>/src/modules/**/models/*.ts',
    '!<rootDir>/src/shared/protocols/*.ts',
    '!<rootDir>/src/server/*.ts',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text-summary', 'lcov'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.(spec|test).ts'],
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDir>/tests/$1',
    '@/(.+)': '<rootDir>/src/$1',
  },
};
