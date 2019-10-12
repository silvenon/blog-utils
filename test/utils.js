const toVFile = require('to-vfile')
const path = require('path')

const getFileMd = () =>
  toVFile.readSync(
    path.resolve(
      __dirname,
      '../__fixtures__/1859-11-24-on-the-origin-of-species.md',
    ),
  )
const getFileMdx = () =>
  toVFile.readSync(
    path.resolve(
      __dirname,
      '../__fixtures__/1859-11-24-on-the-origin-of-species.mdx',
    ),
  )

module.exports = {
  getFileMd,
  getFileMdx,
}
