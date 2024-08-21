require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Note = require('./models/note')

// const password = process.argv[2]

// const url = `mongodb+srv://lucaa20:${password}@cluster0.7qsrmix.mongodb.net/testNotes1?retryWrites=true&w=majority`

// mongoose.set('strictQuery', false)
// mongoose.connect(url)

// const noteSchema = new mongoose.Schema({
//     content: String,
//     important: Boolean,
// })

// noteSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//         returnedObject.id = returnedObject._id.toString()
//         delete returnedObject._id
//         delete returnedObject.__v
//     }
// })

// const Note = mongoose.model('Note', noteSchema)

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

// let notes = [
//     {
//         id:1,
//         content: "HTML is easy",
//         important: true
//     },
//     {
//         id: 2,
//         content: "Browser can execute only Javascripts",
//         important: false
//     },
//     {
//         id: 3,
//         content: "GET and POST are the most important methods of HTTP protocol",
//         important: true
//     }
// ]

// app.get('/', (request, response) => {
//     response.send('<h1>Hello World!</h1>')
// })

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
    // response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
        response.json(note)
    })
    // const id = Number(request.params.id)
    
    // const note = notes.find(note => note.id === id)
    
    // if(note) {
    //     response.json(note)
    // } else {
    //     response.status(404).end()
    // }
})

app.delete('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
        response.json(note)
    })
})

// const generateId = () => {
//     const maxId = notes.length > 0
//         ? Math.max(...notes.map(n => n.id))
//         : 0
//         return maxId + 1
// }

app.post('/api/notes', (request, response) => {
    const body = request.body
    
    if(!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = new Note ({
        content: body.content,
        important: body.important || false,
        
    })
    note.save().then(savedNote=> {
        response.json(savedNote)
    })
})

const unknowEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknowEndpoint' })
}

app.use(unknowEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
