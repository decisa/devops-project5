import mysql from 'mysql';
import config from '#root/config';

const Connection = mysql.createConnection(config.mysql);

Connection.connect(err => {
    
    if (err) {
        console.log(err);
    }
    else 
    console.log('all good!')
});

console.log('current connection is: ', Connection);


module.exports = Connection;