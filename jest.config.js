module.exports = {
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/example/'],
    setupFilesAfterEnv: ['jest-extended'],
    preset: 'react-native',
    transform: {
        '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    },
};
