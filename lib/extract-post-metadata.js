const unified = require('unified')
const parse = require('remark-parse')
const stringify = require('remark-stringify')
const detectFrontmatter = require('remark-frontmatter')
const saveFrontmatter = require('../remark-save-frontmatter')
const removeFrontmatter = require('../remark-remove-frontmatter')
const mdx = require('remark-mdx')
const mdxToRemark = require('./mdx-remark')
const extractExcerpt = require('remark-excerpt')
const toHtml = require('remark-html')
const getDateFromFilePath = require('./get-date-from-file-path')
const toVFile = require('to-vfile')

module.exports = async function extractPostMetadata(
  filePathOrFile,
  {
    frontmatter = false,
    dateFromPath = false,
    excerpt = false,
    isMdx = false,
  } = {},
) {
  let result = {}

  const file =
    typeof filePathOrFile === 'string'
      ? toVFile.readSync(filePathOrFile)
      : filePathOrFile

  if (dateFromPath) {
    const date = getDateFromFilePath(file.path)
    result.date = date
  }

  const requiresContentProcessing = frontmatter || excerpt

  if (requiresContentProcessing) {
    const processor = unified().use(parse)

    if (frontmatter || excerpt) {
      processor.use(stringify)
    }

    processor.use(detectFrontmatter)
    if (frontmatter) {
      processor.use(saveFrontmatter)
    }
    processor.use(removeFrontmatter)

    if (excerpt) {
      if (isMdx) {
        processor.use(mdx).use(mdxToRemark)
      }

      processor.use(extractExcerpt).use(toHtml)
    }

    const { contents, data } = await processor.process(file)

    if (frontmatter) {
      result.frontmatter = data.frontmatter
    }

    if (excerpt) {
      result.excerpt = contents
    }
  }

  return result
}
