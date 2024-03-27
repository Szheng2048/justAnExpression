const express = require('express')
//allows the express extension
const logger = require('morgan')
//allows the morgan extension
const indexRouter = require("./routes/indexRouter")
//a path to the index router set as a variable
const toDoRouter = require('./routes/todoRouter')
//a path to the todo router set as a variable
// const { todo } = require('node:test')

const port = 3000
//a port number set to a constant

const app = express()
//puts the server up

app.use(logger('dev'))
//uses the morgan extension
app.use(express.json())
//uses the express extension
app.use('/', indexRouter)
//a route that the user has to input to go to the index router
app.use('/api/todo/',toDoRouter)
//a route that the user has to input to go to the todos router

app.listen(port, ()=>{
    console.log(`Server Started on port ${port}.`)
})
//allows the server to be launched on a local port