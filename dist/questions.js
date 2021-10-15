const getDesc = require('./lang/utils/getDesc');

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
            return '1-0-0';
          case 'node':
            return '1-1-0';
          default:
        }
      },
    },
    '1-0-0': {
      type: 'input',
      name: 'port',
      message: l('port'),
      default: '8000',
    },
    '1-0-1': {
      type: 'list',
      name: 'customTheme',
      message: l('theme'),
    },
    '1-1-0': {
      type: 'confirm',
      name: 'goodbye',
      message: l('goodbye'),
    },
  };
};
