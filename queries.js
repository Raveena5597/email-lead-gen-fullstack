const Pool = require('pg').Pool
let connectionString = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
};
const pool = new Pool(connectionString)
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

    pool.query('INSERT INTO useraccounts (email, name, dob) VALUES ($1, $2, $3)', [email, name, dob], (error, results) => {
        if (error) {
            response.status(400).json(`Oops! Some error occured.`)
            return
        }
        response.status(201).json(`User added successfully.`)
    })
}

module.exports = { getUsers, createUser }