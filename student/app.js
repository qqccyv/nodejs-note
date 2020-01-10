const express = require('express');
require('./connect/connect')
const path = require('path')
const Student = require('./model/user')
const template = require('art-template')
const bodyParser = require('body-parser')
const dateformat = require('dateformat');
// const servestatic = require('serve-static')
// const serve = servestatic(__dirname, 'public') 在express框架下 不适用  app是express方法创建的
template.defaults.root = path.join(__dirname, 'views')
template.defaults.imports.dateformat = dateformat;
const app = express();
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/index', (req, res) => {
    // let students = await Student.find()
    let html = template('index.art', {
        // students
    })

    res.send(html)
})
app.post('/list', async(req, res) => {

    // console.log(req.body);
    await Student.create(req.body)

    let students = await Student.find();

    let html = template('list.art', {
        students
    })
    res.send(html)
})
app.get('/list', async(req, res) => {

    // console.log(req.body);
    // await Student.create(req.body)

    let students = await Student.find();

    let html = template('list.art', {
        students
    })
    res.send(html)
})


app.listen(80)
console.log('启动成功');