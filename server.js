const mysql = require("mysql");
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const {PORT,DATABASE_NAME, HOST_URL, DATABASE_USERNAME, DATABASE_PASSWORD} = process.env
const connection = mysql.createConnection({
  host: HOST_URL,
  port: PORT,
  user: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  ssl: "Amazon RDS"
});

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  const port = process.env.PORT || 3000;
  const server = app.listen(port, () => {
    console.log(`App running on port ${port}`);
  });
  console.log('connected as id ' + connection.threadId);

  const queryString = 'SELECT * FROM your_table_name';
  connection.query(queryString, (err, results, fields) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
  
    console.log('Query results:', results);

    // Close the connection after the query is executed
    connection.end((err) => {
      if (err) {
        console.error('Error closing connection:', err);
      }
      console.log('Connection closed');
    });
  });
});

// process.on('unhandledRejection', (err) => {
//   console.log('UNHANDLED REJECTION! Shutting down...');
//   console.log(err.name, err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });
