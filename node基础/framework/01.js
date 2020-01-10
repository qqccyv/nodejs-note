const express = require('express');
const app = express();


app.use((req, res, next) => {
    req.age = 19
    next()
})
app.use('/', (req, res, next) => {
    req.sex = 'man'
    next()
})
app.get('/', (req, res, next) => {
    req.name = 'dengyu';
    next();
});
app.get('/', (req, res) => {
    res.send({
        name: req.name,
        age: req.age,
        sex: req.sex
    })
})

app.listen(80)
console.log('启动成功');