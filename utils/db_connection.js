const mysql = require('mysql');
const config = require('../config/db_properties');

module.exports = {
    getConnection: () => {
        return mysql.createConnection({
            host: config.HOST,
            user: config.USER,
            password: config.PASSWORD,
            database: config.DATABASE
        });
    }
}

// const connection = mysql.createConnection({
//     host: db.HOST,
//     user: db.USER,
//     password: db.PASSWORD,
//     database: db.DATABASE
//   });
  
//   // open the MySql connection
//   connection.connect((error) => {
//     if (error) throw error;
//     // eslint-disable-next-line no-console
//     console.log("Database connected successfully :) !");
//   });
  
//   module.exports = connection;