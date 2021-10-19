module.exports = (options) => {
  const { needGithubPages, sourceBranch, pagesBranch } = options;

  return [needGithubPages ? {
    fileName: '.github/workflows/deploy.yml',
    content:
`name: Build and Deploy
on:
  push:
    branches:
      - ${sourceBranch}
jobs:
  build-and-deploy:
    runs-on: macos-latest
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v2.3.1

      - name: Install and Build 🔧
        run: |
          yarn
          yarn run build-github-page

      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@4.1.3
        with:
          branch: ${pagesBranch}
          folder: dist_github_page
`,
  } : null].filter(Boolean);
};
