"use strict";

const INFO_COLOR = '#32d7e8';

const inquirer = require('inquirer');
const chalk = require('chalk');

const questions = [{
  type: 'input',
  name: 'projName',
  message: `What's the name of your project? 👀 `,
}];

inquirer.prompt(questions).then(answers => {
  const { projName } = answers;

  if (projName) {
    console.log(`Your project ${chalk.hex(INFO_COLOR)(projName)} will be created soon...`);
  }
});
