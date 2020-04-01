const visit = require('unist-util-visit')
const yaml = require('yaml')
const toml = require('toml')

const parser = {
  yaml,
  toml,
}

module.exports = function saveFrontmatter(format = 'yaml') {
  return function transformer(tree, file) {
    visit(tree, format, (node) => {
      file.data.frontmatter = parser[format].parse(node.value)
    })
  }
}
