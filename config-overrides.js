const path = require('path');

module.exports = {
  webpack: function(config, env) {
    config.output.path = path.resolve(__dirname, 'dist');
    return config;
  }
};