const { extractPostMetadata } = require('../')
const toVFile = require('to-vfile')

const getFileMd = () =>
  toVFile.readSync(
    `${__dirname}/__fixtures__/1859-11-24-on-the-origin-of-species.md`,
  )
const getFileMdx = () =>
  toVFile.readSync(
    `${__dirname}/__fixtures__/1859-11-24-on-the-origin-of-species.mdx`,
  )

describe('extractPostMetadata', () => {
  it('takes a file path', async () => {
    await expect(
      extractPostMetadata(getFileMd().path, {
        frontmatter: true,
      }),
    ).resolves.toHaveProperty('frontmatter')
  })

  it('takes a vfile', async () => {
    await expect(
      extractPostMetadata(getFileMd(), {
        frontmatter: true,
      }),
    ).resolves.toHaveProperty('frontmatter')
  })

  it('supports MDX', async () => {
    await expect(
      extractPostMetadata(getFileMdx(), {
        frontmatter: true,
        isMdx: true,
      }),
    ).resolves.toHaveProperty('frontmatter')
  })

  describe('extracts metadata', () => {
    describe.each`
      language      | isMdx
      ${'Markdown'} | ${false}
      ${'MDX'}      | ${true}
    `('for $language', ({ isMdx }) => {
      test('all', async () => {
        await expect(
          extractPostMetadata(getFileMd(), {
            frontmatter: true,
            dateFromPath: true,
            excerpt: true,
            isMdx,
          }),
        ).resolves.toMatchSnapshot()
      })

      test('only frontmatter', async () => {
        await expect(
          extractPostMetadata(getFileMd(), { frontmatter: true, isMdx }),
        ).resolves.toMatchSnapshot()
      })

      test('only date', async () => {
        await expect(
          extractPostMetadata(getFileMd(), { dateFromPath: true, isMdx }),
        ).resolves.toMatchSnapshot()
      })

      test('only excerpt', async () => {
        await expect(
          extractPostMetadata(getFileMd(), { excerpt: true, isMdx }),
        ).resolves.toMatchSnapshot()
      })
    })
  })
})
