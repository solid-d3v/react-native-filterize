module.exports = {
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/example/'],
    setupFilesAfterEnv: ['jest-extended'],
    transform: {
        '^.+\\.(js|jsx)?$': 'babel-jest',
    },
};
