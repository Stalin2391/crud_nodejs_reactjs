const mysql = require('mysql');

const connection = mysql.createPool({
    // port:process.env.PORT,
    host:"localhost",
    user:"root",
    password:"uVO))tv_raE,0Yt!MGun",
    database:"crud_node_api_test",
    connectionLimit:10
});

module.exports = connection;