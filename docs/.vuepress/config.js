module.exports = {
  title: 'StoneEpigraph',
  description: 'Welcome to my Blog!',
  head: [
    ['link', {rel: 'icon', href: '/logo.png'}],
    ['link', {rel: 'stylesheet', href: '/css/style.css'}]
  ],
  markdown: {
      lineNumber: true
  },
  themeConfig: {
      nav: require('./nav.js'),
      sidebar: require('./sidebar.js')
  }
}