const mysql = require('mysql');
const config = require('../config/index');

const Connection = mysql.createConnection(config.mysql);

Connection.connect(err => {
    
    if (err) {
        console.log(err);
    }
    else 
    console.log('all good!')
});


module.exports = Connection;