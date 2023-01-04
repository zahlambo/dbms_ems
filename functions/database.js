//importing database connection
const util = require("util");
const mysql = require("mysql");
require('dotenv').config();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.DATABASE_PASSWORD,
  database: "project1",
  connectionLimit: 10,
});

//binding database for using async and await
const query = util.promisify(db.query).bind(db);

module.exports = {
  query, db
};
