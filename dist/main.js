const getFuncs = require('./funcs');
const { info, error, OKFLAG, ERRFLAG, divider } = require('../utils/log');

module.exports = (options) => {
  const { generateFiles, copyAssetsDirs } = getFuncs(options);

  return () => {
    info('🌟', 'start building project with configs...');

    generateFiles();
    copyAssetsDirs();

    divider();
    info('🎯', 'project built successfully!');
  };
};
