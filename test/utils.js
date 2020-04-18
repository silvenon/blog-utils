const toVFile = require('to-vfile')
const path = require('path')

const getFileMd = () =>
  toVFile.readSync(
    path.resolve(
      __dirname,
      '../__fixtures__/1859-11-24-post.md',
    ),
  )
const getFileMdx = () =>
  toVFile.readSync(
    path.resolve(
      __dirname,
      '../__fixtures__/1859-11-24-post.mdx',
    ),
  )

module.exports = {
  getFileMd,
  getFileMdx,
}
