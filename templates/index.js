module.exports = (options) => {
  const templates = [
    'config_files.js',
    'packages.js',
    'webpack_configs.js',
  ].reduce((pre, cur) => {
    const items = require(`./${cur}`)(options);
    return pre.concat(...items);
  }, []);

  return templates;
};
