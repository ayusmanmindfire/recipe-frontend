module.exports = {
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
        "/node_modules/(?!axios)" // Add any other ES module libraries here if needed
      ],
    testEnvironment: 'jsdom',
  };
  