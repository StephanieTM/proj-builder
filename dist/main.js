const getFuncs = require('./funcs');

module.exports = (options) => {
  const { generateFiles } = getFuncs(options);

  return async () => {
    generateFiles();
  };
};
