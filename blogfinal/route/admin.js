const express = require('express')


const session = require('express-session')
    //利用Router创建admin路由
const admin = express.Router();

admin.get('/login', require('./admin/loginPage'))

admin.post('/login', require('./admin/login'))
admin.get('/user', require('./admin/userPage'))
admin.get('/logout', require('./admin/logout'))




module.exports = admin;