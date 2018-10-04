# Subtitles

A small cli made for downloading subtitles. It uses Opensubtitles Api to find the subtitles and saves them alongside original video file. (You should propably change to UserAgent as the test one might break someday and then this will stop working)

## Instalation

Clone the repo to a local folder on your machine, get into its directory and run

`$ npm link`

## Usage

  `$ subtitles [files] [options]`

Options:

__By default, subtitles are downloaded in english, in .srt extension__

__You can adjust the defaults in the `defaults.json` file__

- `-l`, `--lang`: Return specified language of subtitles if available
- `-e`, `--extension`: Look for subtitles in specified extension
- `-r`, `--retry`: Max amount of retries to download

Examples:

```bash
  # Downloads Polish subtitles for Movie1
  $ subtitles Movie1.avi --lang pl

  # Download subs for multiple files
  $ subtitles Movie1.mp4 Movie2.mkv

  # Look for subtitles to all files in a directory in txt format
  $ subtitles * -e txt

  # Retry up to 10 times if something fails
  $ subtitles * -r 10
```
