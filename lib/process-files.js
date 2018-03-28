const path = require('path')

const downloadSubtitles = require('./download-subtitles')
const saveSubtitles = require('./save-subtitles')

const processFiles = async (files, flags) => {
  await Promise.all(files.map(async (name, index) => {
    console.log(`[${index + 1}/${files.length}] ${name}`)
    console.log(`Searching subtitles for: ${name}..`)
    const moviePath = path.resolve(process.cwd(), name)

    const options = {
      path: moviePath,
      fileName: name
    }

    console.log(`Downloading subtitles for: ${name}..`)
    const {
      subtitles,
      filename
    } = await downloadSubtitles(flags.lang, options)

    console.log(`Saving subtitles as: ${filename}..`)
    try {
      await saveSubtitles(filename, subtitles)
      console.log(`Saved file successfully: ${filename}`)
    } catch (err) {
      console.log(`Error saving file: ${filename}`)
      console.log(err)
    }
  }))
}

module.exports = processFiles
