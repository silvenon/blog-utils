const unified = require('unified')
const parse = require('remark-parse')
const frontmatter = require('remark-frontmatter')
const removeFrontmatter = require('./remark-remove-frontmatter')
const stringify = require('remark-stringify')
const { getFileMd } = require('./test/utils')

const processor = unified()
  .use(parse)
  .use(frontmatter)
  .use(removeFrontmatter)
  .use(stringify)

it('removes frontmatter', (done) => {
  expect.hasAssertions()
  processor.process(getFileMd(), (err, file) => {
    if (err != null) return done(err)
    expect(String(file).trim()).toMatchSnapshot()
    done()
  })
})
