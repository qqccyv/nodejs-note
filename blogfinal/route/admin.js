const express = require('express')
const { User } = require('../model/user')
const bcrypt = require('bcryptjs')
    //利用Router创建admin路由
const admin = express.Router();

admin.get('/login', (req, res, next) => {
    res.render('admin/login.html')
})

admin.post('/login', async(req, res, next) => {
    const { email, password } = req.body;
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render('admin/error', { msg: '邮箱地址或者密码错误' })
    }
    let user = await User.findOne({ email })

    if (user) {
        let b = await bcrypt.compare(password, user.password)
        if (b) {
            req.session.username = user.username
            res.render('admin/user', {
                msg: req.session.username
            })
        } else {
            res.status(400).render('admin/error', { msg: '邮箱地址或者密码错误' })
        }
    } else {
        res.status(400).render('admin/error', { msg: '邮箱地址或者密码错误' })
    }
})
admin.get('/user', (req, res, next) => {
    res.render('admin/user')
})
admin.get('/article-edit', (req, res, next) => {
    res.render('admin/article-edit')
})
admin.get('/article', (req, res, next) => {
    res.render('admin/article')
})




module.exports = admin;