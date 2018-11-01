# Change File Case

[![npm version](https://badge.fury.io/js/change-file-case.svg)](https://badge.fury.io/js/change-file-case)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/AmeerTaweel/change-file-case/blob/master/LICENSE)

Script that automates changing all file-names in a folder. Very helpful with folders that contain huge amount of files.

## Instal

`$ npm install change-file-case`

## Usage

In the command line/terminal:
`$ node path-to-index.js directory-to-rename case-code`

### Supported Cases

* Uppercase: code => upper
* Lowercase: code => lower
* Title Case: code => title
* Sentence Case: code => sentence
* Camel Case: code => camel
* Kebab Case: code => kebab
* Snake Case: code => snake

### Example

Suppose we are in the directory of the index.js and want to convert the files in "anyDir" to uppercase:

`$ node index.js ../anyDir upper`