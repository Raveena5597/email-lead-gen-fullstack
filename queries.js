const Pool = require('pg').Pool
const sgMail = require('@sendgrid/mail')
// const pool = new Pool({
//     user: 'me',
//     host: 'localhost',
//     database: 'feba',
//     password: '1234',
//     port: 5432
// })

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
const sendEmail = (request, response) => {
    pool.query('SELECT * FROM useraccounts WHERE date_part(\'day\',dob)=date_part(\'day\',CURRENT_DATE) AND date_part(\'month\',dob)=date_part(\'month\',CURRENT_DATE)', (error, results) => {
        if (error) {
            throw error
        }
        results.rows.forEach(row => {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY)
            const msg = {
                to: row.email, // Change to your recipient
                from: 'raveenavallala@gmail.com', // Change to your verified sender
                subject: 'Hey ' + row.name + '! Happy birthday.',
                text: 'Feba wishes you a very happy days ahead',
                html: '<a href=https://www.feba.co.in/>click here to visit our website</a>',
            }

            sgMail
                .send(msg)
                .then(() => {
                    console.log('Sent email to ' + row.email)
                })
                .catch((error) => {
                    console.error(error)
                })
        })
        response.status(201).json(results.rows)
    })
}


module.exports = { getUsers, createUser, sendEmail }