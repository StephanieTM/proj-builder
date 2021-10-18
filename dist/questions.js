const getDesc = require('./lang/utils/getDesc');
const chalk = require('chalk');

module.exports = (language = 'en') => {
  function l(key) {
    return getDesc(language)(key);
  }

  return {
    'language': {
      type: 'list',
      name: 'language',
      message: 'Which language do you know better?',
      choices: [
        { name: 'English', value: 'en' },
        { name: '简体中文', value: 'zh' },
      ],
    },
    '0': {
      type: 'input',
      name: 'projName',
      message: l('projName'),
    },
    '1': {
      type: 'input',
      name: 'projDesc',
      message: l('projDesc'),
    },
    '2': {
      type: 'input',
      name: 'projRepo',
      message: l('repo'),
    },
    '3': {
      type: 'input',
      name: 'author.name',
      message: l('author'),
    },
    '4': {
      type: 'input',
      name: 'author.email',
      message: l('email'),
    },
    '5': {
      type: 'list',
      name: 'projType',
      message: l('projType'),
      choices: [
        { name: l('projType.frontend'), value: 'frontend' },
        { name: l('projType.node'), value: 'node' },
      ],
      jumpTo: (answer) => {
        switch (answer.projType) {
          case 'frontend':
            return '5-0-0';
          case 'node':
            return '5-1-0';
          default:
            return '';
        }
      },
    },
    '5-0-0': {
      type: 'input',
      name: 'port',
      message: l('port'),
      default: '8000',
    },
    '5-0-1': {
      type: 'list',
      name: 'customTheme',
      message: l('theme'),
      choices: [
        { name: `${chalk.white.bgHex('#2f855a')('#2f855a')},${chalk.white.bgHex('#68d391')('#68d391')}`, value: '#2f855a,#68d391' },
        { name: l('custom'), value: 'CUSTOMIZE' },
      ],
      jumpTo: (answer) => {
        switch (answer.customTheme) {
          case 'CUSTOMIZE':
            return '5-0-1-0-0';
          default:
            return '';
        }
      },
    },
    '5-0-1-0-0': {
      type: 'input',
      name: 'customTheme',
      message: l('customTheme'),
    },
    '5-0-2': {
      type: 'confirm',
      name: 'needGithubPages',
      message: l('needGithubPages'),
      jumpTo: (answer) => {
        if (answer.needGithubPages) {
          return '5-0-2-0-0';
        } else {
          return '';
        }
      },
    },
    '5-0-2-0-0': {
      type: 'list',
      name: 'projCategory',
      message: l('projCategory'),
      choices: [
        { name: l('projCategory.homepageProj'), value: 'homepageProj' },
        { name: l('projCategory.commonProj'), value: 'commonProj' },
      ],
    },
    '5-0-2-0-1': {
      type: 'input',
      name: 'sourceBranch',
      message: l('sourceBranch'),
      default: 'master',
    },
    '5-0-2-0-2': {
      type: 'input',
      name: 'pagesBranch',
      message: l('pagesBranch'),
      default: 'github-pages',
    },
    '5-1-0': {
      type: 'confirm',
      name: 'goodbye',
      message: l('goodbye'),
    },
  };
};
