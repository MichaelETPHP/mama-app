import express from 'express'
import bodyParser from 'body-parser'
import mysql from 'mysql2'
import cors from 'cors'
import { format } from 'date-fns'

const app = express()
const port = 3001

app.use(bodyParser.json())
app.use(cors())

// Database connection
const db = mysql.createConnection({
  host: 'b0by8zqktu8bn6poqbtm-mysql.services.clever-cloud.com',
  user: 'upnkocr6y4897dyc',
  password: 'TT1c039SbFFee0aec6uZ',
  database: 'b0by8zqktu8bn6poqbtm', // Specify the database to use
  multipleStatements: true,
})

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err)
    return
  }
  console.log('Connected to MySQL.')

  // Create table if it doesn't exist
  db.query(
    `CREATE TABLE IF NOT EXISTS patient_data (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      dob DATE NOT NULL,
      weight FLOAT NOT NULL,
      age INT NOT NULL,
      temperature FLOAT NOT NULL,
      bp VARCHAR(50) NOT NULL,
      oxygenRate FLOAT NOT NULL,
      nurseName VARCHAR(255) NOT NULL,
      submittedDate DATETIME NOT NULL
    );`,
    (err, results) => {
      if (err) {
        console.error('Error creating table:', err)
        return
      }
      console.log('Table setup completed.')
    }
  )
})

app.post('/submit-patient-data', (req, res) => {
  const {
    name,
    dob,
    weight,
    age,
    temperature,
    bp,
    oxygenRate,
    nurseName,
    submittedDate,
  } = req.body

  // Format the submittedDate correctly
  const formattedDate = format(new Date(submittedDate), 'yyyy-MM-dd HH:mm:ss')

  const sql = `INSERT INTO patient_data (name, dob, weight, age, temperature, bp, oxygenRate, nurseName, submittedDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  const values = [
    name,
    dob,
    weight,
    age,
    temperature,
    bp,
    oxygenRate,
    nurseName,
    formattedDate,
  ]

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err)
      res.status(500).send('Error inserting data into database.')
      return
    }
    res.status(200).send('Data inserted successfully.')
  })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
