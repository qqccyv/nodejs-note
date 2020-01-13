const express = require('express')
const home = express.Router();

home.get('/default', (req, res, next) => {
    res.render('home/default')
})


module.exports = home;