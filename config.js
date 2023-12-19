const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const {
  PORT,
  DATABASE_NAME,
  HOST_URL,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  CONNECTION_TIMEOUT,
} = process.env;

const config = {
  db: {
    host: HOST_URL,
    port: PORT,
    user: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    connectTimeout: CONNECTION_TIMEOUT,
  },
  listPerPage: 10,
};

module.exports = config;
