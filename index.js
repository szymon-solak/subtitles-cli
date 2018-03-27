#!/usr/bin/env node

const meow = require('meow')

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

console.log('Input: ', cli.input)
console.log('Args:', cli.flags)