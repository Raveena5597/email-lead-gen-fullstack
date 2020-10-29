const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Please use the correct path.' })
})

app.get('/users', db.getUsers)
app.post('/users', db.createUser)
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})