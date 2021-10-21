const chalk = require('chalk');

function themeOptionName(themeStr) {
  if (!themeStr || themeStr.split(',').length < 2) {
    throw new Error('invalid theme string');
  }
  const [primary, secondary] = themeStr.split(',');

  return `${chalk.white.bgHex(primary)(primary)},${chalk.white.bgHex(secondary)(secondary)}`;
}

module.exports = {
  themeOptionName,
};
