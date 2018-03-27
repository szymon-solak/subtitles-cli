#!/usr/bin/env node

const meow = require('meow')
const path = require('path')

const processFiles = require('./lib/process-files')

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
      }
    }
  })

/*
  @TODO
  - Add flag for subtitles extension
  - Add chalk to logs
*/

const files = cli.input

if (!files) cli.showHelp()

const lang = cli.flags.lang || 'en'

if (files === '*') {
  // Grab all files within a directory that resemble a video
  /* @TODO */

} else {
  // Grab selected files only
  processFiles(files, {
    lang
  })
}