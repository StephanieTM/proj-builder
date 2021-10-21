"use strict";

const inquirer = require('inquirer');
const _ = require('lodash');
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
    const path = curQuest.split('-').concat('', '');
    let key = '';

    const next = () => {
      path.pop();
      path.pop();
      key = path.length ? (
        path
          .slice(0, -1)
          .concat(`${Number(path[path.length-1])+1}`)
          .join('-')
      ) : 'end';
    };

    while (key !== 'end' && !q(key)) {
      if (q(curQuest) && typeof q(curQuest).jumpTo === 'function') {
        key = q(curQuest).jumpTo(curAnswer);
        if (!key) {
          next();
        }
      } else {
        next();
      }
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
    options.root = process.cwd();
    require('./main')(options)();
  });
