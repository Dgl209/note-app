const yargs = require('yargs')
const {printNotes, addNote, removeNote} = require('./notes.controller')

yargs.command({
    command: 'add',
    describe: 'Add new note',
    builder: {
        title: {
            type: 'string',
            describe: 'Note title',
            demandOption: true,
        },
    },
    handler: ({ title }) => {
        addNote(title)
    },
})

yargs.command({
    command: 'list',
    describe: 'Show all notes',
    handler: () => {
        printNotes()
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove note by id',
    builder: {
        id: {
            type: 'string',
            describe: 'Note id',
            demandOption: true
        }
    },
    handler: ({id}) => {
        removeNote(id)
    }
})

yargs.parse()