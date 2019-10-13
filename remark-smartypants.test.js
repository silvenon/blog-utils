const unified = require('unified')
const parse = require('remark-parse')
const stringify = require('remark-stringify')
const smartypants = require('./remark-smartypants')

const processor = unified()
  .use(parse)
  .use(smartypants)
  .use(stringify)

it('adds smart punctuation marks to text nodes', done => {
  expect.hasAssertions()
  processor.process('"smart quotes"', (err, file) => {
    if (err != null) return done(err)
    expect(String(file).trim()).toMatchInlineSnapshot(`"“smart quotes”"`)
    done()
  })
})

it('leaves punctuation marks in other nodes intact', done => {
  expect.hasAssertions()
  processor.process('<img src="logo.svg" />', (err, file) => {
    if (err != null) return done(err)
    expect(String(file).trim()).toMatchInlineSnapshot(
      `"<img src=\\"logo.svg\\" />"`,
    )
    done()
  })
})
