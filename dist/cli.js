"use strict";

// const INFO_COLOR = '#32d7e8';

const inquirer = require('inquirer');
// const chalk = require('chalk');
const questions = require('./questions');

let language = 'en';
let curQuest = 'null';

const options = {};

function q(index) {
  return questions(language)[index];
}

function saveOption(answer) {
  if (answer) {
    Object.keys(answer).forEach((key) => {
      options[key] = answer[key];
    });
  }
}

function nextQuest(curAnswer) {
  saveOption(curAnswer);
  if (curQuest === 'null') {
    curQuest = '0';
  } else {
    curQuest = `${Number(curQuest) + 1}`;
  }
  if (curQuest !== '2') {
    return new Promise((resolve) => {
      resolve(inquirer.prompt(q(curQuest)));
    }).then(nextQuest);
  }
}

inquirer
  .prompt(q('language'))
  .then((answers) => {
    language = answers.language;
    saveOption(answers);
  })
  .then(nextQuest)
  .then(() => {
    console.log('options :>> ', options);
  });
