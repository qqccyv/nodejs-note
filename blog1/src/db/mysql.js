const mysql = require('mysql')
    // const { MYSQL_CONF } = require('../conf/db')

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '20152346',
    port: '3306',
    database: 'myblog'
});

con.connect();

function exec(sql) {
    const promise = new Promise((resolve, reject) => {

        con.query(sql, (err, result) => {
            if (err) {
                // reject(err);
                return

            }
            resolve(result);

        })

    })
    return promise
}

module.exports = {
    exec
}