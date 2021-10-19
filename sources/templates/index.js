module.exports = (options) => {
  const templates = [
    'config_files.js',
    'packages.js',
    'webpack_configs.js',
    'husky_configs.js',
    'github_configs.js',
    'interfaces.js',
    'app.js',
    'src.js',
    'views.js',
  ].reduce((pre, cur) => {
    const items = require(`./${cur}`)(options);
    return pre.concat(...items);
  }, []);

  return templates;
};
