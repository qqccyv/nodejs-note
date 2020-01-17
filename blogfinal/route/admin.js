const express = require('express')


const session = require('express-session')
    //利用Router创建admin路由
const admin = express.Router();

admin.get('/login', require('./admin/loginPage'))

admin.post('/login', require('./admin/login'))
admin.get('/user', require('./admin/userPage'))
admin.get('/logout', require('./admin/logout'))

admin.get('/user-edit', require('./admin/user-edit'))
admin.post('/user-edit', require('./admin/user-edit-fn'))
admin.get('/delete', require('./admin/delete'))
admin.post('/user-modify', require('./admin/user-modify'))
    // 文章列表页面路由
admin.get('/article', require('./admin/article'));

// 文章编辑页面路由
admin.get('/article-edit', require('./admin/article-edit'));

admin.post('/article-add', require('./admin/article-add'))
admin.get('/article-modify', require('./admin/article-modify'))

module.exports = admin;