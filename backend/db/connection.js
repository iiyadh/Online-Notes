const mysql = require('mysql2');
require('dotenv').config();

// Create a single connection
const connection = mysql.createConnection({
  host: process.env.HOST,       
  user: process.env.USER,           
  password: process.env.PASSWORD || "",
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the MySQL database!');
  }
});

// Export the connection for use in other files
module.exports = connection;
