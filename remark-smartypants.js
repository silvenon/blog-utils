const unified = require('unified')
const latin = require('retext-latin')
const smartypants = require('retext-smartypants')
const stringify = require('retext-stringify')
const visit = require('unist-util-visit')

module.exports = function remarkSmartypants(options) {
  const processor = unified()
    .use(latin)
    .use(smartypants, options)
    .use(stringify)

  return function transformer(tree) {
    visit(tree, 'text', (node) => {
      node.value = String(processor.processSync(node.value))
    })
  }
}
