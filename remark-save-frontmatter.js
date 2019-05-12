const visit = require('unist-util-visit')
const yaml = require('yaml')

module.exports = function saveFrontmatter() {
  return function transformer(tree, file) {
    visit(tree, 'yaml', node => {
      file.data.frontmatter = yaml.parse(node.value)
    })
  }
}
