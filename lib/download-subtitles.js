const OS = require('opensubtitles-api')
const fetch = require('node-fetch')
const chalk = require('chalk')

const OpenSubtitles = new OS({
  // Default user agent for developing
  useragent: 'TemporaryUserAgent',
  ssl: true
})

OpenSubtitles.login()

const asText = response => response.text()

const downloadSubtitles = async (flags, options) => {
  const searchOptions = Object.assign(
    {},
    options,
    { extensions: flags.extensions }
  )

  const maxRetries = flags.retry

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const name = chalk.yellow(options.filename)
    if (attempt > 0)
        console.log(`Retrying (${attempt}/${maxRetries}) ${name}`)

    try {
      const allSubtitles = await OpenSubtitles.search(searchOptions)
  
      const subtitlesData = allSubtitles[flags.lang]
      if (!subtitlesData) return {}
  
      const url = subtitlesData.url
  
      if (!url) return {}
  
      const response = await fetch(url)
      const subtitles = await asText(response)
  
      return {
        subtitles,
        filename: subtitlesData.filename
      }
    } catch (err) {
      console.log(`Downloading error for: ${name}`)
    }
  }

  return {}
}

module.exports = downloadSubtitles
