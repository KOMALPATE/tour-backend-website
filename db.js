const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Creditt@123',
    database: 'crud'
});

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('MySQL Connected');
    }
});

module.exports = connection;