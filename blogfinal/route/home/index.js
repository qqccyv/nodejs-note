const { Article } = require('../../model/article')
const p = require('mongoose-sex-page')
module.exports = async(req, res, next) => {
    let article = p(Article).find({}).page(1).size(4).display(5).populate('author').exec()
    res.render('home/default')
        // res.send('欢迎来到博客首页')
}