const path = require('path')
const chalk = require('chalk')
const fs = require('fs')

const downloadSubtitles = require('./download-subtitles')
const saveSubtitles = require('./save-subtitles')

const processFiles = async (files, flags) => {
  await Promise.all(files.map(async (name, index) => {
    const nameWithoutPath = name.split(path.sep).pop()
    const idx = `[${index + 1}/${files.length}]`
    console.log(`${chalk.bold(idx)} ${chalk.blue(nameWithoutPath)}`)
    console.log(`Searching for subtitles to: ${chalk.blue(nameWithoutPath)}..`)

    const moviePath = path.resolve(process.cwd(), name)
    const fileSize = fs.statSync(moviePath).size

    const options = {
      path: moviePath,
      filename: nameWithoutPath,
      filesize: fileSize
    }

    console.log(`Downloading subtitles for: ${chalk.blue(nameWithoutPath)}..`)
    const {
      subtitles,
      filename
    } = await downloadSubtitles(flags, options)

    if (!subtitles) {
      console.log(`Could not find suitable subtitles for ${chalk.yellow(nameWithoutPath)}`)
      return
    }

    try {
      await saveSubtitles(subtitles, {
        filename,
        name
      })
      console.log(`Saved file successfully: ${chalk.green(filename)}`)
    } catch (err) {
      console.log(`Error saving file: ${chalk.red(filename)}`)
      console.log(err)
    }
  }))
}

module.exports = processFiles
