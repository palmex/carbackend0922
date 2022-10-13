const express = require('express')
const path = require('path')
const testRouter = require('./routes/test')
const carsRouter = require('./routes/cars')
const usersRouter = require('./routes/users')

var request = require('supertest');
const assert = require('assert');
// install mocha globally
var expect = require('chai').expect;

const cors = require('cors') 

const app = express()
const port = 3000

app.use(cors())
app.use('/test', testRouter)
app.use('/cars', carsRouter)
app.use('/users', usersRouter)
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)

app.get('/', (request, response) => {
    // console.log(request)
    response.json(
        {
            welcome: "Hello Class of Stellantis-OU Module 323423432!"
        }
    )
})

app.get('/html', (request, response) => {
    // console.log(request)
    response.sendFile(
        path.join(__dirname, '/index.html')
    )
})


app.listen(port, () => {
    console.log(`Listening on port localhost:${port}!`)
})

