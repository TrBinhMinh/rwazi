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
  user: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  port: PORT
});

console.log(process.env.DATABASE_NAME);

connection.connect();

connection.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
  if (error) throw error;
  console.log("The solution is: ", results[0].solution);
});

connection.end();
