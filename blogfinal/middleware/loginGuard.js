const express = require('express');
const app = express();
module.exports = (req, res, next) => {

    if (req.url == '/login') {
        next()
    } else if (req.session.username) {
        next()
    } else {
        //重定向要用绝对路径！！！！！
        res.redirect('/admin/login')
    }
}