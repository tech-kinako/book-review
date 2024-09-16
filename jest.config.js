export default {
  // preset: 'ts-jest',
  // testEnvironment: 'jest-environment-jsdom',
  // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // setupFilesAfterEnv: ['<rootDir>/tests/jest/setup-jest.ts'],
  // moduleNameMapper: {
  //   '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  // },
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv:['<rootDir>/setup.jest.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.app.json',
    }],
  },
  moduleNameMapper: {
    '^.+\\.svg$': 'jest-svg-transformer',
    "\\.(css|less)$": "identity-obj-proxy",
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}