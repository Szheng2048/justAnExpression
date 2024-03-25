const express = require('express')
const logger = require('morgan')
const indexRouter = require("./routes/indexRouter")
const toDoRouter = require('./routes/todoRouter')
// const { todo } = require('node:test')

const port = 3000

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use('/', indexRouter)
app.use('/api/todo/',toDoRouter)

app.listen(port, ()=>{
    console.log(`Server Started on port ${port}.`)
})