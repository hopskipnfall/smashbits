const path = require('path');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = function override(config, env) {
    config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));

    config.resolve.alias = {
      Shared: path.resolve('../shared/src/'),
    };

    return config;
};

/*module.exports = {
    paths: function (paths, env) {
        paths.appIndexJs = path.resolve(__dirname, 'src/index.js');
        paths.appSrc = [
          path.resolve(__dirname, 'src'),
          path.resolve('../shared/src'),
        ];
        return paths;
    },
}*/