#!/usr/bin/env node

const meow = require('meow')
const path = require('path')

const getVideoFiles = require('./lib/get-video-files')
const processFiles = require('./lib/process-files')

const defaultOptions = require('./defaults')

const cli = meow(`
  Usage:
    $ subtitles [files] [options]

  Options:
    -l, --lang <language_code> Return specified language of subtitles if possible (defaults to English)

  Examples:
    Downloads Polish subtitles for Movie1
    $ subtitles Movie1.avi --lang pl

    Download subs for multiple files
    $ subtitles Movie1.mp4 Movie2.mkv

    Download subs for all videos in current directory
    $ subtitles *
`, {
    flags: {
      lang: {
        type: 'string',
        alias: 'l'
      },
      ext: {
        type: 'string',
        alias: 'e'
      }
    }
  })

/*
  @TODO
  - Tidy up processing files
*/

const files = cli.input

if (!files.length) cli.showHelp()

const lang = cli.flags.lang || defaultOptions.language
const extensions = (cli.flags.ext)
  ? [cli.flags.ext]
  : defaultOptions.extensions

const videoFiles = getVideoFiles(files)
processFiles(videoFiles, {
  lang,
  extensions
})
