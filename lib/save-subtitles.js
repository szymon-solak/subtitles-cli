const fs = require('fs')
const path = require('path')

const writeFile = (path, file) => 
  new Promise((resolve, reject) => {
    fs.writeFile(path, file, (err) => {
      if (err) reject(err)
      resolve()
    })
  })

const saveSubtitles = async (name, subtitles) => {
  // Directory from where command was run
  const outputDir = process.cwd()
  const outputPath = path.join(outputDir, name)

  return writeFile(outputPath, subtitles)
}

module.exports = saveSubtitles
