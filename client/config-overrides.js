const path = require('path');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = function override(config, env) {
  // Remove the create-react-app plugin that limits source files to the src/ directory.
  config.resolve.plugins = config.resolve.plugins.filter(
    (plugin) => !(plugin instanceof ModuleScopePlugin),
  );

  config.resolve.alias = {
    Shared: path.resolve('../shared/src/'),
  };

  return config;
};
