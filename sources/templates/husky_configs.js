module.exports = (options) => {
  return [{
    fileName: '.husky/.gitignore',
    content:
`_
`,
  }, {
    fileName: '.husky/commit-msg',
    content:
`#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn commitlint --edit $1

`,
    opt: {
      mode: 0o0775, // executable
    },
  }, {
    fileName: '.husky/pre-commit',
    content:
`#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn lint
yarn lintStyle

`,
    opt: {
      mode: 0o0775, // executable
    },
  }];
};
