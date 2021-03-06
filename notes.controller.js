const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
    const notes = await getNotes()

    const note = {
        title,
        id: Date.now()
    }

    notes.push(note)

    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.blueBright('Note was added'))
}

async function removeNote(id) {
    const notes = await getNotes()

    const filteredNotes = notes.filter(note => note.id !== +id )

    if (filteredNotes.length === notes.length) {
        return console.log(chalk.red('\n\n Note not found \n\n'))
    }

    await fs.writeFile(notesPath, JSON.stringify(filteredNotes))
    console.log(chalk.blueBright('Note was removed'))


}

async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding:'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
    const notes = await getNotes()
    console.log(chalk.blueBright('\n \n --- Here is the list of notes --- \n'))
    console.log(chalk.gray('    ID \t\t   TITLE'))
    notes.forEach(note => console.log(chalk.white(note.id + '\t' + note.title)))
    console.log('\n')
}

module.exports = {
    addNote, printNotes, removeNote
}