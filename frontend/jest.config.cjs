module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
  },
  testMatch: [
    '**/tests/*.spec.[jt]s?(x)'
  ],
};
// Please rename this file to jest.config.cjs for best compatibility with Jest.
