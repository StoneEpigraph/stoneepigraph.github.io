module.exports = {
  title: 'StoneEpigraph',
  description: 'stoneepigraph\' s blog about java, python, emacs',
  head: [
    ['link', {rel: 'icon', href: '/img/logo.png'}],
    ['link', {rel: 'stylesheet', href: '/css/style.css'}]
  ],
  markdown: {
      lineNumber: true
  },
  themeConfig: {
      nav: require('./nav.js'),
      sidebar:   require('./sidebar.js'),
      sidebarDepth: 2,
      lastUpdated: '最后更新时间'
  }
}