const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '20152346',
    port: '3306',
    database: 'myblog'
})
con.connect();
const sql = 'select*from blogs';
// const sql = 'select*from users where username="lisi"';
// const sql = 'update users set realname="李四2" where username="lisi"';
// const sql = 'select*from users order by id desc';
// const sql = 'insert into blogs(title,content,createtime,author) values("标题C","内容C",1578466757600,"zhansan")'

con.query(sql, (err, result) => {
    if (err) {
        console.error(err);
        return

    }
    console.log(result);

})
con.end()