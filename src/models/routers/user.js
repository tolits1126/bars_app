const multer = require('multer')
const express = require('express')
require('./db/mongoose')
const userRouter = require('')

const multer = require('multer')
const app = express()
const upload = multer({
    dest:'avatars'
})
app.post('/avatar',upload.single('avatar'),(req , res) => {
res.send()
})

module.exports =router