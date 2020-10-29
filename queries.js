const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'feba',
    password: '1234',
    port: 5432,
})
const getUsers = (request, response) => {
    pool.query('SELECT * FROM useraccounts', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const createUser = (request, response) => {
    const { email, name, dob } = request.body

    pool.query('INSERT INTO users (email, name, dob) VALUES ($1, $2, $3)', [email, name, dob], (error, results) => {
        if (error) {
            response.status(400).send(`Oops! Some error occured. ${error} ${request.body}`)
            return
        }
        response.status(201).send(`User added successfully.`)
    })
}

module.exports = { getUsers, createUser }