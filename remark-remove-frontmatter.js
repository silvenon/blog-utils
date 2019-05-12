const remove = require('unist-util-remove')

module.exports = function removeFrontmatter(format = 'yaml') {
  return function transformer(tree) {
    remove(tree, format)
  }
}
