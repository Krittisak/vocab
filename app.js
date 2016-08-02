'use strict'

const express = require ('express')
const app = express ()
const server = require ('http').Server (app)
const io = require ('socket.io')(server)
const routes = require ('./routes')
const config = require ('./config')

app.use (express.static (__dirname + '/public'))

app.use ('/', routes)

require ('./socket')(io)

server.listen (config.port, () => console.log ('Server Running on Port: ', config.port))
