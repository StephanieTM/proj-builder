const path = require('path');
const fs = require('fs');

module.exports = (language = 'en') => {
  let obj = {};
  
  return (key) => {
    if (!obj[language]) {
      const filePath = path.resolve(__dirname, `../${language}/desc.json`);
      const file = fs.readFileSync(filePath, 'utf8');
      try {
        obj[language] = JSON.parse(file);
      } catch (e) {
        throw new Error('cannot parse JSON file');
      }
    }
    return (obj[language] || {})[key];
  };
};
