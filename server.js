const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const path = require('path');
const port = process.env.PORT || 5000;

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/users', db.getUsers)
app.post('/api/users', db.createUser)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})