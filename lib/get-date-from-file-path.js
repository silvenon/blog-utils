const { RE_DATE } = require('./consts')

module.exports = function getDateFromFilePath(filePath) {
  const matches = filePath.match(RE_DATE)

  if (matches != null) {
    const [date] = matches
    return date
  }

  // eslint-disable-next-line no-console
  console.warn(
    `File path \`${filePath}\` does not contain a valid date format YYYY-MM-DD.`,
  )

  return null
}
