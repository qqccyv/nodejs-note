const express = require('express');
const app = express();
const fs = require('fs');
app.get('/index', (req, res, next) => {
    fs.readFile('./01.js1', 'utf8', (err, doc) => {
        if (err != null) {
            next(err)
        } else {
            res.send(doc)
        }
    })
})
app.use((err, req, res) => {
    res.status(500).send(err.message)
})



app.listen(80)
console.log('启动成功');