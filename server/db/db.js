const mysql = require('mysql');
const dbConfig = require('./db.config.js');

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB, 
    multipleStatements: true
});

connection.connect(err => {
    if (err) throw err;
    console.log('Successfully connected to the database.')
});

module.exports = connection;