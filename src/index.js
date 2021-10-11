const express = require('express')
require('note-app/task-manager/src/db/mongoose')
const User = require('note-app/task-manager/src/models/user')
const Task = require('note-app/task-manager/src/models/task')
const FileReader = require('note-app/task-manager/src/models/fileReader')


 




const app = express()
const port = process.env.PORT || 3000

const multer = require('multer')
const upload =multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },

    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload a word document'))
        }
            cb(undefined, true)
        // cb(new Error('File must be a PDF'))
        // cb(undefined, true)
        // cb(undefined, false)
    }

})



//end point
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})



app.use(express.json())

app.post('/users',(req, res) => {
    const user = new User(req.body)
    user.save().then(() => {
        res.status().send(user)
    }).catch((e) => {
        res.status(400).send(e)
        
    })
})

app.post('/tasks',(req, res) => {
    const task = new Task(req.body)
    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})





app.post('/fileReader',(req, res) => {

    exports.checkRules = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    };

    const date = new FileReader(req.body)
    date.save().then(() => {
        res.status(201).send(date)
    }).catch((e) => {
        res.status(400).send(e)
        
    })
 })


 app.listen(port,() => {
    console.log('Server is up on port' + port);
})