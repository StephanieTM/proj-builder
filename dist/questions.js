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
        { name: l('projType.frontend'), value: 'frontend' }
      ],
    },
  };
};
