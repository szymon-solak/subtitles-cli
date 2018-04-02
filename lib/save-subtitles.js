const fs = require('fs')
const path = require('path')

const writeFile = (path, file) => 
  new Promise((resolve, reject) => {
    fs.writeFile(path, file, (err) => {
      if (err) reject(err)
      resolve()
    })
  })

const saveSubtitles = async (subtitles, {
  filename,
  name
} = {}) => {
  // Directory from where command was run
  const outputDir = process.cwd()

  /* 
    Extract path from name if it was called
    from an upper level directory
  */
  const additionalPath = name.split(path.sep).slice(0, -1).join()

  const outputPath = path.join(outputDir, additionalPath, filename)
  console.log('Output Path:', outputPath)

  return writeFile(outputPath, subtitles)
}

module.exports = saveSubtitles
