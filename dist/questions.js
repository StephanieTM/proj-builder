const getDesc = require('./lang/utils/getDesc');
const { themeOptionName } = require('./utils');

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
      validate: (input) => {
        if (['.', '..'].indexOf(input) > -1) {
          return l('projName.validate.reserved');
        }
        if (!/^([A-Z]|[a-z]|[0-9]|-|_|\.)+$/.test(input)) {
          return l('projName.validate.invalid');
        }
        return true;
      },
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
      validate: (input) => {
        if (/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g.test(input)) {
          return true;
        }
        return l('email.validate.invalid');
      },
    },
    '5': {
      type: 'list',
      name: 'projType',
      message: l('projType'),
      choices: [
        { name: l('projType.frontend'), value: 'frontend' },
      ],
      jumpTo: (answer) => {
        switch (answer.projType) {
          case 'frontend':
            return '5-0-0';
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
      validate: (input) => {
        if (/^[1-9][0-9]{3,4}$/.test(input)) {
          if (Number(input) < 65536) {
            return true;
          }
        }
        return l('port.validate.invalid');
      },
    },
    '5-0-1': {
      type: 'list',
      name: 'customTheme',
      message: l('theme'),
      choices: [
        { name: themeOptionName('#2f855a,#68d391'), value: '#2f855a,#68d391' },
        { name: themeOptionName('#ff7d37,#ffc11f'), value: '#ff7d37,#ffc11f' },
        { name: themeOptionName('#194da5,#3c95db'), value: '#194da5,#3c95db' },
        { name: l('custom'), value: 'CUSTOMIZE' },
      ],
      validate: (input) => {
        if (/^CUSTOMIZE$|^#([0-9]|[a-f]){3}(([0-9]|[a-f]){3})?,#([0-9]|[a-f]){3}(([0-9]|[a-f]){3})?$/i.test(input)) {
          return true;
        }
        return l('customTheme.validate.invalid');
      },
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
      validate: (input) => {
        if (/^#([0-9]|[a-f]){3}(([0-9]|[a-f]){3})?,#([0-9]|[a-f]){3}(([0-9]|[a-f]){3})?$/i.test(input)) {
          return true;
        }
        return l('customTheme.validate.invalid');
      },
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
  };
};
