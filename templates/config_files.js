module.exports = (options) => {
  return [{
    fileName: '.browserslistrc',
    content: `
> 1% # Browser usage over 1%
Last 4 versions # Or last two versions
ie >= 10
iOS >= 7
Android >= 4

    `,
  }, {
    fileName: '.commitlintrc.js',
    content: `
module.exports = {
  extends: [
    '@commitlint/config-conventional'
  ],
};

    `,
  }, {
    fileName: '.editorconfig',
    content: `
# @see: https://editorconfig.org/
root = true

[*]
end_of_line = lf
insert_final_newline = true
charset = utf-8
indent_style = space
indent_size = 2
trim_trailing_whitespace = true

    `,
  }, {
    fileName: '.eslintignore',
    content: `
node_modules/
dist/

    `,
  }, {
    fileName: '.eslintrc.js',
    content: `
module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'prettier',
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/display-name': 'off',
  },
  plugins: [
    'react-hooks',
    '@babel',
  ],
  overrides: [
    {
      files: ['*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        allowImportExportEverywhere: true,
        ecmaFeatures: {
          jsx: true,
        },
      },
      extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
      ],
      rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/display-name': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
      },
      plugins: [
        'react-hooks',
        '@babel',
      ],
    },
  ],
};

    `,
  }, {
    fileName: '.gitignore',
    content: `
node_modules/
dist/
dist_github_page/

.vscode
.eslintcache
.DS_Store

    `,
  }, {
    fileName: '.prettierrc.js',
    content: `
module.exports = {
  semi: true,
  eslintIntegration: true,
  trailingComma: 'all',
  arrowParens: 'avoid',
  singleQuote: true,
  printWidth: 200,
  tabWidth: 2,
  jsxBracketSameLine: false,
  useTabs: false,
  editor: {
    tabSize: 2,
  },
};

    `,
  }, {
    fileName: '.stylelintignore',
    content: `
dist/
node_modules/

.vscode
.eslintcache
.DS_Store

    `,
  }, {
    fileName: '.stylelintrc.js',
    content: `
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
  ],
};

    `,
  }, {
    fileName: '.yarnrc',
    content: `
registry "https://registry.npm.taobao.org/"

    `,
  }, {
    fileName: 'babel.config.js',
    content: `
module.exports = (api) => {
  const isProd = api.env('production');

  const presets = [
    ['@babel/preset-env', { modules: false, useBuiltIns: 'usage', corejs: '3.9' }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ];

  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime',
    isProd ? null : 'react-hot-loader/babel'
  ].filter(Boolean);

  return {
    presets,
    plugins,
    env: {
      test: {
        presets: [
          ['@babel/preset-env', { modules: 'commonjs' }]
        ],
        plugins: ['@babel/plugin-transform-modules-commonjs'],
      },
    },
  };
};
    
    `,
  }, {
    fileName: 'dev-server.js',
    content: `
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const config = require('./webpack.dev');
const env = require('./env');

const options = {
  contentBase: './dist',
  compress: true,
  hot: true,
  port: env.PORT || 3000,
  host: '0.0.0.0',
  historyApiFallback: {
    index: 'views/index.html',
  },
  index: 'views/index.html',
  writeToDisk: true,
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:3002',
      changeOrigin: true,
    },
  },
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(options.port, options.host, () => {
  console.log(\`dev server listening on port \${options.port}\`);
});

    `,
  }, {
    fileName: 'env.js',
    content: `
module.exports = {
  PORT: ${options.port},
};

    `,
  }, {
    fileName: 'server.js',
    content: `
const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const env = require('./env');

const app = express();
const staticRoot = path.join(__dirname, 'dist');

app.use(express.static(staticRoot));
app.use('/api', createProxyMiddleware({
  target: 'http://127.0.0.1:3002',
  changeOrigin: true,
}));

app.get('/*', (req, res) => {
  res.sendFile('./views/index.html', { root: staticRoot });
});

app.listen(env.PORT || 3000, function() {
  console.log(\`app listening on port \${env.PORT || 3000}!\\n\`);
});

    `,
  }, {
    fileName: 'tsconfig.json',
    content: `
{
  "compilerOptions": {
    "target": "es5",
    "module": "ESNext",
    "lib": [ "dom", "esnext" ],
    "allowJs": true,
    "checkJs": false,
    "jsx": "react",
    "declaration": false,
    "sourceMap": true,
    "noEmit": true,
    "strict": false,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "node",
    "baseUrl": "./",
    "paths": {
      "app": ["./app"],
      "app/*": ["./app/*"],
      "src": ["./src"],
      "src/*": ["./src/*"],
      "common": ["./src/common"],
      "common/*": ["./src/common/*"]
    },
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "suppressImplicitAnyIndexErrors": true,
    "forceConsistentCasingInFileNames": true,
    "importsNotUsedAsValues": "preserve",
    "pretty": true,
    "importHelpers": true
  },
  "exclude": [],
  "include": [
    "./app",
    "./src"
  ]
}

    `,
  }];
};
