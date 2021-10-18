const fs = require('fs');
const path = require('path');
const getTemplates = require('../templates');

const filesToMakeExecutable = [
  './.husky/commit-msg',
  './.husky/pre-commit',
];

module.exports = (options) => {
  function chmod() {
    filesToMakeExecutable.forEach(fileName => {
      try {
        fs.chmodSync(path.resolve(options.root, fileName), 0o755);
      } catch (e) {
        console.log(e);
      }
    });
  }

  function generateFiles() {
    const templates = getTemplates(options);
    templates.forEach(template => {
      const filePath = path.join(options.root, template.fileName);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, template.content, template.opt);
    });
  }

  return {
    generateFiles,
    chmod,
  };
};
