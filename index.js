const express = require('express')
const path = require('path')
const testRouter = require('./routes/test')

const app = express()
const port = 3000

app.use('/test', testRouter)
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