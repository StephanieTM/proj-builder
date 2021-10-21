const chalk = require('chalk');

const DIVIDER = '============================================================'

const COLOR_INFO = chalk.hex('#24c75f');
const COLOR_ERROR = chalk.hex('#d81616');
const COLOR_WARN = chalk.hex('#ecb30d');
const COLOR_DEBUG = chalk.hex('#32d7e8');
const COLOR_DATABASE = chalk.hex('#709fb0');

const LEVELS = {
  INFO: {
    color: COLOR_INFO,
    text: 'INFO',
  },
  ERROR: {
    color: COLOR_ERROR,
    text: 'ERROR',
  },
  WARN: {
    color: COLOR_WARN,
    text: 'WARN',
  },
  DEBUG: {
    color: COLOR_DEBUG,
    text: 'DEBUG',
  },
  DATABASE: {
    color: COLOR_DATABASE,
    text: 'DATABASE',
  },
};

const OKFLAG = COLOR_INFO('✔');
const ERRFLAG = COLOR_ERROR('✖');

const LOG_TIME = false;

function getTimeStr() {
  const date = new Date();
  return LOG_TIME ? `[${date} ${date.getTime()}]` : '';
}

function colog(color, ...msg) {
  const time = getTimeStr();
  if (color) {
    console.log(chalk.gray(time), color(...msg));
  } else {
    console.log(chalk.gray(time), ...msg);
  }
}

function cologWithLevel(level, ...msg) {
  const { color, text } = level || {};
  const time = getTimeStr();
  if (color) {
    console.log(chalk.gray(time), color(text), ...msg);
  } else {
    console.log(chalk.gray(time), text, ...msg);
  }
}

function info(...msg) {
  cologWithLevel(LEVELS.INFO, ...msg);
}

function error(...msg) {
  cologWithLevel(LEVELS.ERROR, ...msg);
}

function warn(...msg) {
  cologWithLevel(LEVELS.WARN, ...msg);
}

function debug(...msg) {
  cologWithLevel(LEVELS.DEBUG, ...msg);
}

function database(msg) {
  cologWithLevel(LEVELS.DATABASE, msg);
}

function normal(...msg) {
  console.log(...msg);
}

function divider(color) {
  const msg = `\n${DIVIDER}\n`;
  if (color) {
    console.log(chalk.hex(color)(msg));
  } else {
    console.log(msg);
  }
}

module.exports = {
  colog,
  cologWithLevel,
  info,
  error,
  warn,
  debug,
  database,
  normal,
  divider,
  getTimeStr,
  LEVELS,
  OKFLAG,
  ERRFLAG,
};
