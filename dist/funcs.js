const fs = require('fs-extra');
const path = require('path');
const getTemplates = require('../sources/templates');

const assetsDirsToCopy = [
  { from: '../sources/assets', to: 'assets' },
];

module.exports = (options) => {
  function generateFiles() {
    const templates = getTemplates(options);
    templates.forEach(template => {
      const filePath = path.join(options.root, template.fileName);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, template.content, template.opt);
    });
  }

  function copyAssetsDirs() {
    assetsDirsToCopy.forEach(assets => {
      const destDir = path.resolve(options.root, assets.to);
      fs.mkdirSync(destDir, { recursive: true });
      fs.copySync(path.resolve(__dirname, assets.from), destDir);
    });
  }

  return {
    generateFiles,
    copyAssetsDirs,
  };
};
