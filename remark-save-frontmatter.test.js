const unified = require('unified')
const parse = require('remark-parse')
const frontmatter = require('remark-frontmatter')
const saveFrontmatter = require('./remark-save-frontmatter')
const removeFrontmatter = require('./remark-remove-frontmatter')
const stringify = require('retext-stringify')
const { getFileMd } = require('./test/utils')

const processor = unified()
  .use(parse)
  .use(frontmatter)
  .use(saveFrontmatter)
  .use(removeFrontmatter)
  .use(stringify)

it('saves parsed frontmatter', (done) => {
  expect.hasAssertions()
  processor.process(getFileMd(), (err, file) => {
    if (err != null) return done(err)
    expect(file.data).toMatchInlineSnapshot(`
      Object {
        "frontmatter": Object {
          "author": "Charles Darwin",
          "title": "On the Origin of Species",
        },
      }
    `)
    done()
  })
})
