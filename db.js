const mysql = require('mysql');

const db = mysql.createConnection({
    host: '192.168.10.25',
    user: 'projet',
    password: 'projet',
    database: 'rack'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connecté à la base de données MySQL');
});

module.exports = db;
