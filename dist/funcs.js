const fs = require('fs-extra');
const path = require('path');
const getTemplates = require('../sources/templates');
const { info, error, OKFLAG, ERRFLAG, divider } = require('../utils/log');

const assetsDirsToCopy = [
  { from: '../sources/assets', to: 'assets' },
];

module.exports = (options) => {
  function generateFiles() {
    divider();
    info('🌟', 'start generating files...')
    const templates = getTemplates(options);
    templates.forEach(template => {
      const filePath = path.join(options.root, template.fileName);
      try {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, template.content, template.opt);
        info('📁', `file ${filePath} created`);
      } catch (e) {
        error(ERRFLAG, e);
      }
    });
    info(OKFLAG, 'files generated!')
  }

  function copyAssetsDirs() {
    divider();
    info('🌟', 'start copying assets...')
    assetsDirsToCopy.forEach(assets => {
      const destDir = path.resolve(options.root, assets.to);
      try {
        fs.mkdirSync(destDir, { recursive: true });
        fs.copySync(path.resolve(__dirname, assets.from), destDir);
        info('⛰', `assets ${destDir} created`);
      } catch (e) {
        error(ERRFLAG, e);
      }
    });
    info(OKFLAG, 'assets copied!')
  }

  return {
    generateFiles,
    copyAssetsDirs,
  };
};
