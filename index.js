// File System.
const fs = require("fs")

// Log welcome message.
console.log(`+------------------------+`)
console.log(`|                        |`)
console.log(`|   Change Case Script   |`)
console.log(`|                        |`)
console.log(`+------------------------+`)
console.log(``)
console.log(`      \"Ameer Taweel\"      `)
console.log(``)

// List of all available cases to convert.
const supportedCases = [`upper`, `lower`, `title`, `sentence`, `camel`, `kebab`, `snake`]

// Get arguments passed in the command line.
// process.argv Docs: https://nodejs.org/api/process.html#process_process_argv
const args = process.argv
const dirPath = args[2]
const wantedCase = args[3]

// Check if the arguments are valid.
// fs.existsSync Docs: https://nodejs.org/docs/latest/api/fs.html#fs_fs_existssync_path
// fs.lstatSync Docs: https://nodejs.org/docs/latest/api/fs.html#fs_fs_lstatsync_path_options
if(args.length != 4){
    console.log(`ERROR: Invalid arguments.`)
    return
}
if (!fs.existsSync(dirPath)) {
    console.log(`ERROR: Path does not exist.`)
    return
}
if (!fs.lstatSync(dirPath).isDirectory()) {
    console.log(`ERROR: Path is not a directory.`)
    return
}
if (!supportedCases.includes(wantedCase)) {
    console.log(`ERROR: Specified case is not supported.`)
    return
}
console.log(`- Path and case are valid, renaming process started.`)

// Get all the file names in the specified path.
// fs.readdirSync Docs: https://nodejs.org/api/fs.html#fs_fs_readdirsync_path_options
const fileNames = fs.readdirSync(dirPath)
console.log(`- Converting ${fileNames.length} file names to ${wantedCase} case.`)

// Change the name case for all the directory content.
// fs.renameSync Docs: https://nodejs.org/api/fs.html#fs_fs_renamesync_oldpath_newpath
for(let i = 0; i < fileNames.length; i++){
    const oldName = fileNames[i]
    const newName = changeCase(fileNames[i], wantedCase)
    fs.renameSync(`${dirPath}/${oldName}`, `${dirPath}/${newName}`)
}
console.log(`- Successfully renamed ${fileNames.length} files to ${wantedCase} case.`)

// Change the name case for all the directory content.
function changeCase(s, newCase){
    switch(newCase) {
        case `upper`:
            return s.toUpperCase()
        case `lower`: 
            return s.toLowerCase()
        case `title`:
            return toTitleCase(s)
        case `sentence`:
            return toSentenceCase(s)
        case `camel`:
            return toCamelCase(s)
        case `kebab`:
            return toSnakeKebabCase(s, `-`)
        case `snake`:
            return toSnakeKebabCase(s, `_`)
    }
}

// Convert text to title case: lorem ipsum => Lorem Ipsum
function toTitleCase(s){
    let result = ``
    const words = s.split(` `)
    for(let i = 0; i < words.length; i++){
        let word = words[i].toLowerCase()
        word = `${word.substring(0, 1).toUpperCase()}${word.substring(1, word.length)} `
        result += word
    }
    result = result.substring(0, result.length - 1)
    return result
}

// Convert text to sentence case: lorem ipsum => Lorem ipsum
function toSentenceCase(s){
    let result = s.toLowerCase()
    result = `${result.substring(0, 1).toUpperCase()}${result.substring(1, result.length)}`
    return result
}

// Convert text to camel case: lorem ipsum => loremIpsum
function toCamelCase(s){
    let result = ``
    const words = s.split(` `)
    for(let i = 0; i < words.length; i++){
        let word = words[i].toLowerCase()
        if(i > 0){
            word = `${word.substring(0, 1).toUpperCase()}${word.substring(1, word.length)}`
        }
        result += word
    }
    return result
}

// Convert text to kebab or snake case:
// lorem ipsum => lorem-ipsum "kebab" / lorem_ipsum "snake"
function toSnakeKebabCase(s, separator){
    let result = ``
    const words = s.split(` `)
    for(let i = 0; i < words.length; i++){
        let word = words[i].toLowerCase()
        word = `${word}${separator}`
        result += word
    }
    result = result.substring(0, result.length - 1)
    return result
}