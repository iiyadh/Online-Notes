const mysql = require('mysql2');
require('dotenv').config();

const dbConfig = {
  host: process.env.HOST,       
  user: process.env.USER,           
  password: process.env.PASSWORD || "",
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let connection;

function handleDisconnect() {
  connection = mysql.createConnection(dbConfig);

  connection.connect(err => {
    if (err) {
      console.error("Error connecting to the database:", err.message);
      setTimeout(handleDisconnect, 5000); // Retry after 5 seconds
    } else {
      console.log("Connected to the MySQL database!");
    }
  });

  connection.on("error", err => {
    console.error("MySQL error:", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST" || err.code === "ECONNRESET") {
      console.log("Reconnecting to MySQL...");
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

// Start the initial connection
handleDisconnect();

module.exports = connection;
