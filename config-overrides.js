/* eslint-disable @typescript-eslint/no-var-requires */
const {
  alias
} = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@api': 'src/api',
    '@hooks': 'src/hooks',
    '@store': 'src/store',
    '@types': 'src/types',
    '@pages': 'src/pages',
    '@routes': 'src/routes',
    '@components': 'src/components',
  })(config);

  return config;
};