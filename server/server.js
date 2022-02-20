const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
mongoose.connect('mongodb://localhost:27017/usersDb')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



const usersRouter = require('./routers/users')
const { sendMessage } = require('./function/users')

app.use('/users', usersRouter)

io.on("connection", (socket) => {
    console.log("we have connction")

    socket.on('SEND', ({ content, to, token }) => {

        let message = sendMessage(content, to, token)

        io.emit('RECIVE', message);


    })



    socket.on('disconnect', () => {

    })
})


server.listen(5000);