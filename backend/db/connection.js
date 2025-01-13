const mysql = require('mysql2');

// Create a single connection
const connection = mysql.createConnection({
  host: 'localhost',       
  user: 'root',           
  password: '',
  database: 'sticky_notes_app',
  port: 4306,
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
