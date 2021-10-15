"use strict";

// const INFO_COLOR = '#32d7e8';

const inquirer = require('inquirer');
const _ = require('lodash');
// const chalk = require('chalk');
const questions = require('./questions');

let language = 'en';
let curQuest = 'start';

const options = {};

function q(index) {
  return questions(language)[index];
}

function saveOption(answer) {
  if (answer) {
    _.merge(options, answer);
  }
}

function nextQuest(curAnswer) {
  saveOption(curAnswer);
  if (curQuest === 'start') {
    curQuest = '0';
  } else {
    const path = curQuest.split('-').concat('');
    let key = '';
    while (key !== 'end' && !questions[key]) {
      path.pop();
      key = path.length ? (
        path
          .slice(0, -1)
          .concat(`${Number(path[path.length-1])+1}`)
          .join('-')
      ) : 'end';
    }
    curQuest = key;
  }
  if (curQuest !== 'end') {
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
