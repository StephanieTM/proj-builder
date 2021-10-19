module.exports = (options) => {
  const { projName, needGithubPages, projCategory } = options;
  const [primary, secondary] = options.customTheme.split(',');

  return [needGithubPages ? {
    fileName: 'app/views/github-page/404.ejs',
    content:
`<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <meta charset="utf-8">
  <title>${projName}</title>
  <link href="${needGithubPages && projCategory === 'commonProj' ? `/${projName}/` : '/'}assets/images/juice.png" type="image/x-icon" rel="shortcut icon">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">

  <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
  <meta name="App-Config" content="fullscreen=yes,useHistoryState=yes,transition=yes">
  <meta name="format-detection" content="telephone=no">

  <script type="text/javascript">
    // Single Page Apps for GitHub Pages
    // MIT License
    // https://github.com/rafgraph/spa-github-pages
    // This script takes the current url and converts the path and query
    // string into just a query string, and then redirects the browser
    // to the new url with only a query string and hash fragment,
    // e.g. https://www.foo.tld/one/two?a=b&c=d#qwe, becomes
    // https://www.foo.tld/?/one/two&a=b~and~c=d#qwe
    // Note: this 404.html file must be at least 512 bytes for it to work
    // with Internet Explorer (it is currently > 512 bytes)

    // If you're creating a Project Pages site and NOT using a custom domain,
    // then set pathSegmentsToKeep to 1 (enterprise users may need to set it to > 1).
    // This way the code will only replace the route part of the path, and not
    // the real directory in which the app resides, for example:
    // https://username.github.io/repo-name/one/two?a=b&c=d#qwe becomes
    // https://username.github.io/repo-name/?/one/two&a=b~and~c=d#qwe
    // Otherwise, leave pathSegmentsToKeep as 0.
    var pathSegmentsToKeep = ${projCategory === 'homepageProj' ? '0' : '1'};

    var l = window.location;
    l.replace(
      l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
      l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
      l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
      (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
      l.hash
    );

  </script>

</head>
<body>
</body>
</html>
`,
  } : null, needGithubPages ? {
    fileName: 'app/views/github-page/index.ejs',
    content:
`<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <meta charset="utf-8">
  <title>${projName}</title>
  <link href="${needGithubPages && projCategory === 'commonProj' ? `/${projName}/` : '/'}assets/images/juice.png" type="image/x-icon" rel="shortcut icon">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">

  <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
  <meta name="App-Config" content="fullscreen=yes,useHistoryState=yes,transition=yes">
  <meta name="format-detection" content="telephone=no">
  <style>
    .app-loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    .app-loading {
      position: relative;
      width: 40px;
      height: 40px;
      animation: app-loading 2.5s infinite linear both;
    }

    .app-loading-tips {
      margin-top: 20px;
      color: ${secondary};
    }

    .app-loading-dot {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      animation: app-loading-dot 2s infinite ease-in-out both;
    }

    .app-loading-dot::before {
      display: block;
      width: 25%;
      height: 25%;
      content: '';
      background-color: ${primary};
      border-radius: 100%;
      animation: app-loading-dot-before 2s infinite ease-in-out both;
    }

    .app-loading-dot:nth-child(1) { animation-delay: -1.1s; }
    .app-loading-dot:nth-child(2) { animation-delay: -1s; }
    .app-loading-dot:nth-child(3) { animation-delay: -0.9s; }
    .app-loading-dot:nth-child(4) { animation-delay: -0.8s; }
    .app-loading-dot:nth-child(5) { animation-delay: -0.7s; }
    .app-loading-dot:nth-child(6) { animation-delay: -0.6s; }
    .app-loading-dot:nth-child(1)::before { animation-delay: -1.1s; }
    .app-loading-dot:nth-child(2)::before { animation-delay: -1s; }
    .app-loading-dot:nth-child(3)::before { animation-delay: -0.9s; }
    .app-loading-dot:nth-child(4)::before { animation-delay: -0.8s; }
    .app-loading-dot:nth-child(5)::before { animation-delay: -0.7s; }
    .app-loading-dot:nth-child(6)::before { animation-delay: -0.6s; }

    @keyframes app-loading {
      100% { transform: rotate(360deg); }
    }

    @keyframes app-loading-dot {
      80%,
      100% { transform: rotate(360deg); }
    }

    @keyframes app-loading-dot-before {
      50% { transform: scale(0.4); }

      100%,
      0% { transform: scale(1); }
    }
  </style>

  <script type="text/javascript">
    // Single Page Apps for GitHub Pages
    // MIT License
    // https://github.com/rafgraph/spa-github-pages
    // This script checks to see if a redirect is present in the query string,
    // converts it back into the correct url and adds it to the
    // browser's history using window.history.replaceState(...),
    // which won't cause the browser to attempt to load the new url.
    // When the single page app is loaded further down in this file,
    // the correct url will be waiting in the browser's history for
    // the single page app to route accordingly.
    (function(l) {
      if (l.search[1] === '/' ) {
        var decoded = l.search.slice(1).split('&').map(function(s) { 
          return s.replace(/~and~/g, '&')
        }).join('?');
        window.history.replaceState(null, null,
            l.pathname.slice(0, -1) + decoded + l.hash
        );
      }
    }(window.location))
  </script>

  <%= htmlWebpackPlugin.tags.headTags %>
</head>
<body>
  <div id="app">
    <div class="app-loading-container">
      <div class="app-loading">
        <div class="app-loading-dot"></div>
        <div class="app-loading-dot"></div>
        <div class="app-loading-dot"></div>
        <div class="app-loading-dot"></div>
        <div class="app-loading-dot"></div>
        <div class="app-loading-dot"></div>
      </div>
      <div class="app-loading-tips">Loading...</div>
    </div>
  </div>
  <%= htmlWebpackPlugin.tags.bodyTags %>
</body>
</html>
`,
  } : null, {
    fileName: 'app/views/index.ejs',
    content:
`<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <meta charset="utf-8">
  <title>${projName}</title>
  <link href="/assets/images/juice.png" type="image/x-icon" rel="shortcut icon">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">

  <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
  <meta name="App-Config" content="fullscreen=yes,useHistoryState=yes,transition=yes">
  <meta name="format-detection" content="telephone=no">

  <style>
    .app-loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    .app-loading {
      position: relative;
      width: 40px;
      height: 40px;
      animation: app-loading 2.5s infinite linear both;
    }

    .app-loading-tips {
      margin-top: 20px;
      color: ${secondary};
    }

    .app-loading-dot {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      animation: app-loading-dot 2s infinite ease-in-out both;
    }

    .app-loading-dot::before {
      display: block;
      width: 25%;
      height: 25%;
      content: '';
      background-color: ${primary};
      border-radius: 100%;
      animation: app-loading-dot-before 2s infinite ease-in-out both;
    }

    .app-loading-dot:nth-child(1) { animation-delay: -1.1s; }
    .app-loading-dot:nth-child(2) { animation-delay: -1s; }
    .app-loading-dot:nth-child(3) { animation-delay: -0.9s; }
    .app-loading-dot:nth-child(4) { animation-delay: -0.8s; }
    .app-loading-dot:nth-child(5) { animation-delay: -0.7s; }
    .app-loading-dot:nth-child(6) { animation-delay: -0.6s; }
    .app-loading-dot:nth-child(1)::before { animation-delay: -1.1s; }
    .app-loading-dot:nth-child(2)::before { animation-delay: -1s; }
    .app-loading-dot:nth-child(3)::before { animation-delay: -0.9s; }
    .app-loading-dot:nth-child(4)::before { animation-delay: -0.8s; }
    .app-loading-dot:nth-child(5)::before { animation-delay: -0.7s; }
    .app-loading-dot:nth-child(6)::before { animation-delay: -0.6s; }

    @keyframes app-loading {
      100% { transform: rotate(360deg); }
    }

    @keyframes app-loading-dot {
      80%,
      100% { transform: rotate(360deg); }
    }

    @keyframes app-loading-dot-before {
      50% { transform: scale(0.4); }

      100%,
      0% { transform: scale(1); }
    }
  </style>

  <%= htmlWebpackPlugin.tags.headTags %>
</head>
<body>
  <div id="app">
    <div class="app-loading-container">
      <div class="app-loading">
        <div class="app-loading-dot"></div>
        <div class="app-loading-dot"></div>
        <div class="app-loading-dot"></div>
        <div class="app-loading-dot"></div>
        <div class="app-loading-dot"></div>
        <div class="app-loading-dot"></div>
      </div>
      <div class="app-loading-tips">Loading...</div>
    </div>
  </div>
  <%= htmlWebpackPlugin.tags.bodyTags %>
</body>
</html>
`,
  }].filter(Boolean);
};
