const getFuncs = require('./funcs');

module.exports = (options) => {
  const { generateFiles, copyAssetsDirs } = getFuncs(options);

  return async () => {
    generateFiles();
    copyAssetsDirs();
  };
};
