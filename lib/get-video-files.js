const path = require('path')

const supportedExtensions = [
  '.avi',
  '.mkv',
  '.mp4'
]

const getVideoFiles = (files) => {
  return files.filter((file) => {
    const extension = path.extname(file)
    if (supportedExtensions.includes(extension)) return true
    return false
  })
}

module.exports = getVideoFiles
