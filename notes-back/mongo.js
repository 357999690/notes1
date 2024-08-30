const mongoose = require('mongoose')

if(process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://lucaa20:${password}@cluster0.7qsrmix.mongodb.net/testsNotes1?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)



const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'get and post',
    important: false
})

// note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note.s)
    })
    mongoose.connection.close()
})

