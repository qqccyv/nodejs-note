const express = require('express');
const app = express();
const bodyParser = require('body-parser')
require('./model/connect')
    //创建一位用户，创建完成后注释
require('./model/user')
const path = require('path')

const session = require('express-session')
const template = require('art-template')
const dateformat = require('dateformat')

app.use(session({
        //属性未添加完全会有各种提示
        resave: false,
        secret: 'keyboard cat',
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000
        }
    }))
    //引入模块化路由
const home = require('./route/home')
const admin = require('./route/admin')
    //静态文件所在位置
app.use(express.static(path.join(__dirname, 'public')))
    //后缀为art的文件用express-art-template模板
app.engine('art', require('express-art-template'));
app.engine('html', require('express-art-template'));
//模板所在位置
app.set('views', path.join(__dirname, 'views'));
//模板默认后缀
app.set('view engine', 'art')
template.defaults.imports.dateformat = dateformat
    //利用bodyparser方法连接解析post参数
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/admin', require('./middleware/loginGuard'));
//分发模块化路由
app.use('/home', home)
app.use('/admin', admin)

app.use((err, req, res, next) => {

    console.log(err);

    const result = JSON.parse(err)
        // let obj = {path: '/admin/user-edit', message: '密码比对失败,不能进行用户信息的修改', id: id}
    let params = [];
    for (var attr in result) {
        if (attr != path) {
            params.push(attr + '=' + result[attr])
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`)
})






app.listen(80);
console.log('网站服务器启动成功');