const OS = require('opensubtitles-api')
const fetch = require('node-fetch')

const testResponse = require('../testResponse')

const OpenSubtitles = new OS({
  // Default user agent for developing
  useragent: 'TemporaryUserAgent',
  ssl: true
})

OpenSubtitles.login()

const asText = response => response.text()

const downloadSubtitles = async (lang, options) => {
  const allSubtitles = await OpenSubtitles.search(options)

  const subtitlesData = allSubtitles[lang]
  const url = subtitlesData.url

  const response = await fetch(url)
  const subtitles = await asText(response)

  return {
    subtitles,
    filename: subtitlesData.filename
  }
}

module.exports = downloadSubtitles
