// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    "@/components/(.*)$": "<rootDir>/src/components/$1",
    "@/layouts/(.*)$": "<rootDir>/src/layouts/$1",
    "@/utils/(.*)$": "<rootDir>/src/utils/$1",
    "@/classes/(.*)$": "<rootDir>/src/classes/$1",
    "@/hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "@/styles/(.*)$": "<rootDir>/styles/$1",
    "@/types/(.*)$": "<rootDir>/src/types/$1",
    "@/styles/(.*)$": "<rootDir>/styles/$1",
    "@/data/(.*)$": "<rootDir>/src/data/$1",
  }
}


// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
