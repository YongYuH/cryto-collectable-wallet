exports.createPages = (args) => {
  const { actions } = args
  const { createRedirect } = actions

  createRedirect({
    fromPath: '/',
    toPath: '/assets',
    redirectInBrowser: true,
    isPermanent: true,
  })
}

/** ref: https://stackoverflow.com/a/55757176/5235017 */
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/assets/)) {
    page.matchPath = "/assets/*"

    // Update the page.
    createPage(page)
  }
}