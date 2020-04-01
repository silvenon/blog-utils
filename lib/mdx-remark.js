const removeImports = require('remark-mdx-remove-imports')
const removeExports = require('remark-mdx-remove-exports')
const visit = require('unist-util-visit')

module.exports = function mdxToRemark(options) {
  return function transformer(tree) {
    removeImports(options)(tree)
    removeExports(options)(tree)
    visit(tree, 'jsx', (node) => {
      node.type = 'html'
    })
  }
}
